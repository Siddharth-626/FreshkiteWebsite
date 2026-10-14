// Security Rules tests for the free-training registration flow.
// Run with: npm run test:rules   (starts the Firestore emulator; requires Java 11+)

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { after, before, beforeEach, describe, test } from "node:test";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

const ADMIN_UID = "admin-1";
const STUDENT_FIELDS = {
  fullName: "Arjun Kumar",
  email: "arjun@example.com",
  phoneNumber: "+919876543210",
  collegeName: "Government College of Engineering",
  branch: "Computer Science and Engineering",
};

let env;

before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-freshkite",
    firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8") },
  });
});

after(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), "admins", ADMIN_UID), { email: "admin@freshkite.in" });
  });
});

function publicDb() {
  return env.unauthenticatedContext().firestore();
}

/** Builds the same two-document batch the site writes; overrides tweak either document. */
function registrationBatch(db, { registration = {}, lock = {}, lockEmail, registrationId } = {}) {
  const regRef = registrationId
    ? doc(db, "studentRegistrations", registrationId)
    : doc(collection(db, "studentRegistrations"));
  const data = { ...STUDENT_FIELDS, status: "registered", registeredAt: serverTimestamp(), ...registration };
  for (const [key, value] of Object.entries(data)) if (value === undefined) delete data[key];

  const batch = writeBatch(db);
  batch.set(regRef, data);
  batch.set(doc(db, "registrationEmails", lockEmail ?? data.email), {
    registrationId: regRef.id,
    createdAt: serverTimestamp(),
    ...lock,
  });
  return { batch, regRef };
}

async function seedRegistration(id = "reg-1", fields = {}) {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), "studentRegistrations", id), {
      ...STUDENT_FIELDS,
      status: "registered",
      registeredAt: Timestamp.now(),
      ...fields,
    });
  });
}

describe("public registration", () => {
  test("a valid registration and email lock succeed together", async () => {
    await assertSucceeds(registrationBatch(publicDb()).batch.commit());
  });

  test("a second registration with the same email is rejected", async () => {
    await assertSucceeds(registrationBatch(publicDb()).batch.commit());
    await assertFails(
      registrationBatch(publicDb(), { registration: { fullName: "Someone Else" } }).batch.commit()
    );
  });

  test("a registration without its email lock is rejected", async () => {
    const db = publicDb();
    await assertFails(
      setDoc(doc(collection(db, "studentRegistrations")), {
        ...STUDENT_FIELDS,
        status: "registered",
        registeredAt: serverTimestamp(),
      })
    );
  });

  test("an email lock without its registration is rejected", async () => {
    await assertFails(
      setDoc(doc(publicDb(), "registrationEmails", STUDENT_FIELDS.email), {
        registrationId: "does-not-exist",
        createdAt: serverTimestamp(),
      })
    );
  });

  test("an email lock keyed by a different email is rejected", async () => {
    await assertFails(registrationBatch(publicDb(), { lockEmail: "other@example.com" }).batch.commit());
  });

  test("an email lock pointing at a different registration is rejected", async () => {
    await assertFails(registrationBatch(publicDb(), { lock: { registrationId: "someone-else" } }).batch.commit());
  });

  const invalid = {
    "an extra field": { isAdmin: true },
    "a missing field": { branch: undefined },
    "a status other than registered": { status: "selected" },
    "a client-supplied timestamp": { registeredAt: Timestamp.fromDate(new Date("2020-01-01")) },
    "an uppercase email": { email: "Arjun@Example.com" },
    "a malformed email": { email: "not-an-email" },
    "a phone number not in E.164 form": { phoneNumber: "9876543210" },
    "untrimmed text": { fullName: " Arjun Kumar " },
    "a one-character name": { fullName: "A" },
    "a name over 100 characters": { fullName: "A".repeat(101) },
    "a college name over 150 characters": { collegeName: "C".repeat(151) },
    "a non-string field": { collegeName: 42 },
  };
  for (const [label, registration] of Object.entries(invalid)) {
    test(`a registration with ${label} is rejected`, async () => {
      await assertFails(registrationBatch(publicDb(), { registration }).batch.commit());
    });
  }

  test("an email containing a slash can't be used to write elsewhere", async () => {
    // "a/b@x.com" would make the lock path registrationEmails/a/b@x.com — the SDK refuses it outright.
    await assert.rejects(async () =>
      registrationBatch(publicDb(), { registration: { email: "a/b@example.com" } }).batch.commit()
    );
    // Even with a valid lock key, the rules reject the slash in the registration's email.
    await assertFails(
      registrationBatch(publicDb(), { registration: { email: "a/b@example.com" }, lockEmail: "ab@example.com" }).batch.commit()
    );
  });

  test("an email lock with extra fields is rejected", async () => {
    await assertFails(registrationBatch(publicDb(), { lock: { note: "x" } }).batch.commit());
  });

  test("the public cannot read, list, count, update or delete registrations", async () => {
    await seedRegistration();
    const db = publicDb();
    await assertFails(getDoc(doc(db, "studentRegistrations", "reg-1")));
    await assertFails(getDocs(collection(db, "studentRegistrations")));
    await assertFails(getCountFromServer(collection(db, "studentRegistrations")));
    await assertFails(updateDoc(doc(db, "studentRegistrations", "reg-1"), { status: "selected" }));
    await assertFails(deleteDoc(doc(db, "studentRegistrations", "reg-1")));
  });

  test("the public cannot read email locks, so registered emails aren't revealed", async () => {
    await assertSucceeds(registrationBatch(publicDb()).batch.commit());
    await assertFails(getDoc(doc(publicDb(), "registrationEmails", STUDENT_FIELDS.email)));
    await assertFails(getDocs(collection(publicDb(), "registrationEmails")));
  });

  test("an existing registration cannot be overwritten by re-creating it", async () => {
    await seedRegistration("reg-1");
    await assertFails(
      registrationBatch(publicDb(), { registrationId: "reg-1", registration: { email: "new@example.com" } }).batch.commit()
    );
  });
});

describe("administrators", () => {
  const adminDb = () => env.authenticatedContext(ADMIN_UID).firestore();
  const strangerDb = () => env.authenticatedContext("stranger").firestore();

  test("a signed-in non-admin cannot read registrations", async () => {
    await seedRegistration();
    await assertFails(getDoc(doc(strangerDb(), "studentRegistrations", "reg-1")));
    await assertFails(getDocs(collection(strangerDb(), "studentRegistrations")));
  });

  test("an admin can read, list and count registrations", async () => {
    await seedRegistration();
    await assertSucceeds(getDoc(doc(adminDb(), "studentRegistrations", "reg-1")));
    await assertSucceeds(getDocs(collection(adminDb(), "studentRegistrations")));
    await assertSucceeds(getCountFromServer(collection(adminDb(), "studentRegistrations")));
  });

  test("an admin can change the status with an audit stamp", async () => {
    await seedRegistration();
    await assertSucceeds(
      updateDoc(doc(adminDb(), "studentRegistrations", "reg-1"), {
        status: "contacted",
        statusUpdatedAt: serverTimestamp(),
        statusUpdatedBy: ADMIN_UID,
      })
    );
  });

  test("a non-admin cannot change the status", async () => {
    await seedRegistration();
    await assertFails(
      updateDoc(doc(strangerDb(), "studentRegistrations", "reg-1"), {
        status: "contacted",
        statusUpdatedAt: serverTimestamp(),
        statusUpdatedBy: "stranger",
      })
    );
  });

  const badUpdates = {
    "an unknown status": { status: "hired", statusUpdatedAt: serverTimestamp(), statusUpdatedBy: ADMIN_UID },
    "another admin's uid": { status: "contacted", statusUpdatedAt: serverTimestamp(), statusUpdatedBy: "someone" },
    "a client timestamp": { status: "contacted", statusUpdatedAt: Timestamp.now(), statusUpdatedBy: ADMIN_UID },
    "a change to student data": {
      status: "contacted",
      statusUpdatedAt: serverTimestamp(),
      statusUpdatedBy: ADMIN_UID,
      email: "changed@example.com",
    },
  };
  for (const [label, update] of Object.entries(badUpdates)) {
    test(`an admin status update with ${label} is rejected`, async () => {
      await seedRegistration();
      await assertFails(updateDoc(doc(adminDb(), "studentRegistrations", "reg-1"), update));
    });
  }

  test("an admin cannot delete registrations", async () => {
    await seedRegistration();
    await assertFails(deleteDoc(doc(adminDb(), "studentRegistrations", "reg-1")));
  });

  test("users can check only their own admin entry, and nobody can write admins", async () => {
    await assertSucceeds(getDoc(doc(adminDb(), "admins", ADMIN_UID)));
    await assertSucceeds(getDoc(doc(strangerDb(), "admins", "stranger")));
    await assertFails(getDoc(doc(strangerDb(), "admins", ADMIN_UID)));
    await assertFails(getDocs(collection(adminDb(), "admins")));
    await assertFails(setDoc(doc(strangerDb(), "admins", "stranger"), { email: "x@example.com" }));
    await assertFails(setDoc(doc(publicDb(), "admins", "anyone"), {}));
  });

  test("admins cannot read email locks", async () => {
    await assertSucceeds(registrationBatch(publicDb()).batch.commit());
    await assertFails(getDoc(doc(adminDb(), "registrationEmails", STUDENT_FIELDS.email)));
  });
});

test("unknown collections are closed", async () => {
  await assertFails(setDoc(doc(publicDb(), "anything", "x"), { a: 1 }));
  await assertFails(getDoc(doc(env.authenticatedContext(ADMIN_UID).firestore(), "anything", "x")));
});
