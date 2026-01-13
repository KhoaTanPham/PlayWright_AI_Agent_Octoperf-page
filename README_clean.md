# Playwright PetStore Tests

This repository contains Playwright TypeScript E2E tests for the PetStore demo (OctoPerf / JPetStore).

## Overview

- Tests: `tests/`
- Page objects: `page-object/`
- Test artifacts (HTML snapshots, screenshots): `artifacts/`

---

## Project workflow (quick)

1) Create Playwright project

```bash
npm init playwright@latest
```

2) Install dependencies

```bash
npm install
npx playwright install
```

3) Create test cases (see `test-cases.md`)

4) Implement page objects in `page-object/` and specs in `tests/`

5) Run tests

```bash
npx playwright test --workers=1
```

Run a single spec (Chrome):

```bash
npx playwright test tests/checkout.spec.ts --project=chrome --headed --workers=1
```

---

## Quick commands

- Run Chrome (headed):

```bash
npx playwright test --project=chrome --headed --workers=1
```

- Run Edge (headless):

```bash
npx playwright test --project=edge --workers=1
```

- Show report:

```bash
npx playwright show-report
```

---

If you want this to replace `README.md`, say "Replace README" and I'll overwrite the file with this cleaned version.