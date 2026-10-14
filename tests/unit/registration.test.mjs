import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  EMAIL_PATTERN,
  comparisonKey,
  normalizePhone,
  validateRegistration,
} from "../../lib/registration.ts";

const VALID = {
  fullName: "  Arjun   Kumar ",
  email: " Arjun@Example.COM ",
  phoneNumber: "98765 43210",
  collegeName: "Government  College of Engineering",
  branch: "Computer Science and Engineering",
};

describe("validateRegistration", () => {
  test("normalizes valid input", () => {
    const { errors, data } = validateRegistration(VALID);
    assert.deepEqual(errors, {});
    assert.deepEqual(data, {
      fullName: "Arjun Kumar",
      email: "arjun@example.com",
      phoneNumber: "+919876543210",
      collegeName: "Government College of Engineering",
      branch: "Computer Science and Engineering",
    });
  });

  test("reports every missing field", () => {
    const { errors, data } = validateRegistration({
      fullName: " ",
      email: "",
      phoneNumber: "",
      collegeName: "",
      branch: "",
    });
    assert.equal(data, null);
    assert.deepEqual(Object.keys(errors).sort(), ["branch", "collegeName", "email", "fullName", "phoneNumber"]);
  });

  test("enforces length limits after normalization", () => {
    assert.ok(validateRegistration({ ...VALID, fullName: "A" }).errors.fullName);
    assert.ok(validateRegistration({ ...VALID, fullName: "A".repeat(101) }).errors.fullName);
    assert.equal(validateRegistration({ ...VALID, fullName: "A".repeat(100) }).errors.fullName, undefined);
    assert.ok(validateRegistration({ ...VALID, collegeName: "C".repeat(151) }).errors.collegeName);
  });

  test("rejects invalid emails, including ones that would break a document path", () => {
    for (const email of ["arjun", "arjun@", "arjun@example", "a/b@example.com", "a b@example.com", "a@b..com"]) {
      assert.ok(validateRegistration({ ...VALID, email }).errors.email, email);
    }
  });
});

describe("normalizePhone", () => {
  const cases = {
    "9876543210": "+919876543210",
    "+91 98765 43210": "+919876543210",
    "+91-98765-43210": "+919876543210",
    "919876543210": "+919876543210",
    "09876543210": "+919876543210",
    "0091 9876543210": "+919876543210",
    "+1 (415) 555-0123": "+14155550123",
    "+44 20 7946 0958": "+442079460958",
  };
  for (const [input, expected] of Object.entries(cases)) {
    test(`${input} → ${expected}`, () => assert.equal(normalizePhone(input), expected));
  }

  for (const input of ["12345", "5876543210", "+91 12345 67890", "+9198765", "98765abc10", "4155550123"]) {
    test(`rejects ${input}`, () => assert.equal(normalizePhone(input), null));
  }
});

test("EMAIL_PATTERN matches the pattern in firestore.rules", async () => {
  const { readFile } = await import("node:fs/promises");
  const rules = await readFile(new URL("../../firestore.rules", import.meta.url), "utf8");
  // The rules use [.] for a literal dot; the TS pattern uses \. — compare after normalizing.
  const rulesPattern = rules.match(/data\.email\.matches\("(.+?)"\)/)[1].replaceAll("[.]", "\\.");
  assert.equal(rulesPattern, EMAIL_PATTERN.source);
});

test("comparisonKey ignores case and spacing", () => {
  assert.equal(comparisonKey("  Anna   University "), comparisonKey("anna university"));
});
