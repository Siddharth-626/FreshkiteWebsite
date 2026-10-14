# Free Java Training — Registration & Admin Dashboard

- **`/register`**: public page where college students sign up for the free one-week Java & Problem Solving training.
- **`/admin`**: private dashboard where Freshkite staff view, filter, update and export registrations.

The site is a static export (`output: "export"`), so there is no server. The browser talks to Firebase
directly, and **all access control is enforced by Firestore Security Rules** (`firestore.rules`).
The `/admin` page's sign-in screen only controls what is rendered. The data is protected by the rules.

---

## One-time setup

### 1. Create the Firebase project
1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. **Build → Firestore Database → Create database**. Choose **production mode** and the
   `asia-south1` (Mumbai) location. The location cannot be changed later.
3. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable.**
   Leave "Email link" off.
4. **Authentication → Settings → User actions**: untick **Enable create (sign-up)** so nobody can
   create accounts from the browser. Admin accounts are added by hand (step 4).
5. **Project settings → General → Your apps → Add app → Web**. Copy the config values.

### 2. Configure environment variables
Copy `.env.example` to `.env.local` and fill in the `NEXT_PUBLIC_FIREBASE_*` values. Set the same
variables in your hosting provider's build settings. They are compiled into the static build, so
**rebuild after changing them**.

These values are public identifiers, not secrets. They are visible in the browser by design.

### 3. Deploy the Security Rules
```bash
npx firebase login
npx firebase use --add          # pick the project, alias it "default"
npx firebase deploy --only firestore:rules,firestore:indexes
```
Re-run this whenever `firestore.rules` changes. **Until the rules are deployed, registrations will be
rejected** (production mode denies everything by default).

### 4. Add an administrator
1. **Authentication → Users → Add user**: enter the admin's email and a strong password.
2. Copy the new user's **User UID**.
3. **Firestore → Start collection** `admins` → Document ID = **the UID** → add a field such as
   `email` (string) for reference. Only the document's existence matters.

To revoke access, delete the `admins/{uid}` document (and optionally disable the user). The rules
check it on every request, so revocation is immediate.

### 5. (Recommended) Enable App Check against spam
Without a server, the registration endpoint is open to scripted submissions. App Check makes Firebase
accept writes only from your real website.
1. Create a **reCAPTCHA v3** key at <https://www.google.com/recaptcha/admin> for your domain(s).
2. **Firebase Console → App Check → Apps → your web app → reCAPTCHA v3**: paste the secret key.
3. Put the site key in `NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY` and rebuild.
4. Watch **App Check → APIs → Cloud Firestore** metrics for a few days. When nearly all traffic is
   verified, click **Enforce**.

For local development with App Check enabled, set `NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG=true` in
`.env.local`, open the site, copy the debug token from the browser console, and register it under
**App Check → Apps → ⋮ → Manage debug tokens**.

---

## How it works

### Data model
| Collection | Document ID | Purpose |
|---|---|---|
| `studentRegistrations` | auto | `fullName`, `email`, `phoneNumber` (E.164), `collegeName`, `branch`, `status`, `registeredAt` (server time). Admin status changes add `statusUpdatedAt` and `statusUpdatedBy`. |
| `registrationEmails` | normalized email | Create-only lock enforcing **one registration per email**. Nobody can read it. |
| `admins` | Auth UID | Presence = admin access. Writable only from the Console / Admin SDK. |

A registration is one atomic batch that writes both a `studentRegistrations` doc and its
`registrationEmails` lock. The rules use `getAfter()` to require that the two point at each other.
A second sign-up with the same email fails because the lock already exists, and the public can
never read any registration data.

### Validation
The same limits apply in the browser (`lib/registration.ts`) and in the rules (`firestore.rules`):
**change both together**. A unit test checks that the email patterns match.

- Name 2–100 chars, college 2–150, branch 2–100; whitespace is trimmed and collapsed.
- Email is lowercased. Indian mobiles are accepted as `98765 43210`, `+91…`, `091…` etc. and stored
  as `+919876543210`. International numbers must start with `+`.
- `status` must be `registered` and `registeredAt` must be the server time on create.

### Admin dashboard
- Sign-in uses Firebase Auth email/password with **tab-scoped sessions**: closing the tab signs out.
- Summary cards (total / today / this week) use server-side counts in **India Standard Time**;
  weeks start Monday.
- The **date range** is applied by Firestore. **Search, college and status filters** run in the
  browser over the loaded range. Up to **10,000** registrations are loaded per range; beyond that a
  warning asks you to narrow the dates.
- **Export to Excel** downloads exactly the filtered rows (all pages) as
  `Freshkite_Student_Registrations_YYYY-MM-DD.xlsx`.
- Status can be set to Registered / Contacted / Selected / Rejected. Admins cannot edit student
  details or delete registrations. Use the Firebase Console for corrections.

### Common situations
| Symptom | Cause / fix |
|---|---|
| Every registration fails with "We couldn't complete your registration" | Rules not deployed, or App Check enforced without the site key in the build. |
| A student says they can't register | They (or someone) already registered with that email. Find it in the dashboard. |
| A student needs to change their email | Edit `email` on their registration in the Console, then create the new `registrationEmails/{new}` lock and delete the old one. |
| Admin sees "not authorized" | Missing `admins/{uid}` document, or its ID isn't the exact UID. |
| "a required Firestore index is missing" | Run `npx firebase deploy --only firestore:indexes`. (The current queries only need the automatic single-field index.) |

---

## Testing
```bash
npm run test:unit    # validation, phone normalization, IST date maths
npm run test:rules   # Security Rules against the Firestore emulator (needs Java 11+)
```
`test:rules` starts the emulator on port 8180 (see `firebase.json`). On a machine low on memory, cap
the emulator's JVM first, e.g. `JAVA_TOOL_OPTIONS="-Xmx256m -XX:+UseSerialGC" npm run test:rules`.

## Privacy
Registrations hold personal data (names, emails, phone numbers). Keep the `admins` list short,
remove staff who leave, and treat exported spreadsheets as confidential. Consider deleting
registrations after the internship selection is complete.
