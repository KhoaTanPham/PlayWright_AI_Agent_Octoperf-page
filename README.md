# Playwright PetStore Tests

Playwright TypeScript end-to-end tests for the PetStore demo (OctoPerf / JPetStore).

**Overview**

- **Purpose:** Step-by-step guidance to create a Playwright project, design test cases from the story, generate test scripts, run and debug tests, and iterate on scripts.


## Workflow Steps
 

1) Create Playwright project

- Initialize a new Playwright project (TypeScript):

```bash
npm init playwright@latest
```

- Choose TypeScript and the `tests` folder when prompted. Commit the generated `playwright.config.ts` and `package.json`.

2) Setup Playwright and create test cases (from `DesignTestCase.agent.md`)

- Install dependencies and browsers:

```bash
npm install
npx playwright install
```

- Read `story.txt` and follow `DesignTestCase.agent.md` to produce `test-cases.md` entries. Each case should include: `id`, `title`, `preconditions`, `test data`, `steps`, `expected results`.

3) Generate test scripts (per `GenerateTestScript.agent.md`)

- Implement page objects under `page-object/` for reusable UI operations.
- For each `test-cases.md` entry, create a Playwright spec in `tests/` that uses the page objects and implements the steps.

4) Run and debug test scripts

- Run the full suite (Chrome & Edge):

```bash
npx playwright test --workers=1
```

- Run a single spec for debugging (headed):

```bash
npx playwright test tests/<spec>.ts --project=chrome --headed --workers=1
```

- Use `npx playwright show-report` and `npx playwright show-trace` to inspect failures; save HTML/screenshot artifacts to `artifacts/` for flaky steps.

5) Update and stabilize test scripts

- Fix flaky selectors and prefer stable navigation (direct URLs where appropriate), encapsulate flows in page-object methods, add retries or increased timeouts as needed.
- Once stable, remove temporary diagnostic writes (HTML/screenshot) from specs and run the suite again.

---

If you'd like, I can now execute the next task: run the test suite, generate the HTML report, or help produce `test-cases.md` from `story.txt`.
- Initialize a new Playwright project (TypeScript):
