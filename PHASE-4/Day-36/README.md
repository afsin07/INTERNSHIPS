# MediPredict — Frontend-Only Prototype

This adds Sign In, a Dashboard, a Health Assessment questionnaire, and a
generated Report on top of your existing landing/registration page —
**entirely in the browser, no backend/server/database.**

## New files

```
login.html          Sign-in page for registered users
dashboard.html       Post-login home: stats + report history
health-form.html     The health questionnaire
report.html          Displays one generated report

js/auth.js           Shared "database" layer (users, sessions, reports) via localStorage
js/login.js          Login page logic
js/dashboard.js       Dashboard logic
js/health-form.js     Collects answers, runs the prediction engine, saves the report
js/predict.js         Rule-based scoring engine that generates the "AI" report
js/report.js          Renders a saved report

app.css               Styles for the pages above (reuses your existing color/fonts)
```

`index.html`, `style.css`, and `script.js` were lightly updated:
- Added a "Sign In" link to the navbar.
- Registration now saves the account into `localStorage` and redirects to
  `login.html` after the success modal.

## How data is stored

Everything lives in the browser's `localStorage`:

- `mp_users` — array of all registered accounts
- `mp_session` — the currently logged-in user's email
- `mp_reports_<email>` — array of that user's saved reports

No data ever leaves the browser. There is no server, API, or database.

## About the "AI" report

`js/predict.js` is a **transparent, rule-based scoring function** — not a
trained machine learning model. It matches selected symptoms against a
small set of condition rules, factors in lifestyle answers (sleep, stress,
smoking, activity, diet), and produces a risk score, a top flagged
condition, and recommendations. It's meant to demonstrate the full user
flow, not to make real medical predictions.

## Known limitations (be upfront about these)

- **Not secure** — passwords are stored in plain text in `localStorage`,
  visible to anyone with access to the browser's dev tools. Never do this
  in a real product handling real health data.
- **Not cross-device** — accounts and reports only exist in the browser/
  device they were created on. Clearing browser data deletes everything.
- **Not a real AI model** — the "prediction" is simple weighted if/else
  logic, not something trained on medical data.

## Turning this into a real product later

If you outgrow the prototype, the natural next step is to swap:
- `localStorage` → a real database (e.g. via a backend API)
- Plain-text passwords → server-side hashing (e.g. bcrypt) + real auth
  (sessions/JWT)
- `js/predict.js` → a real trained model or medical API, called from a
  backend that keeps any model/API keys off the client

The page structure, forms, and report layout can stay mostly the same —
only the storage/auth layer would need to move server-side.
