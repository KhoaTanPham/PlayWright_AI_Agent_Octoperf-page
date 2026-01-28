# PetStore Automated Testing Project

## Project Overview

This project implements automated testing for PetStore Demo Application (https://petstore.octoperf.com/) using Playwright framework with TypeScript and Page Object Model pattern. The project includes 47 test cases covering 7 main features of the application.

## Project Architecture

```
├── tests/
│   ├── page-objects/           # Page Object Model classes
│   ├── fixtures/              # Test fixtures
│   ├── login/                 # Feature 1: User Authentication tests
│   ├── logout/                # Feature 2: User Logout tests  
│   ├── browsing/              # Feature 3: Browse Categories tests
│   ├── product-details/       # Feature 4: View Pet Details tests
│   ├── cart/                  # Feature 5: Add to Cart tests
│   ├── checkout/              # Feature 6: Checkout Order tests
│   ├── search/                # Feature 7: Search Pet tests
│   └── smoke/                 # Smoke tests
├── petstore-comprehensive-test-plan.md   # Comprehensive test plan
├── DesignTestCase.agent.md              # Test design methodology
├── GenerateTestScript.agent.md         # Script generation methodology
└── README.md                           # Project documentation
```

## End-to-End Process Flow

### Step 1: Environment Setup

1. **Initialize Playwright project:**
   ```bash
   npm create playwright@latest
   ```

2. **Install Playwright MCP server:**
   ```bash
   npx playwright init-agents --loop=vscode
   ```

3. **Configure Playwright (playwright.config.ts):**
   - Browser: Chromium with headed mode
   - Timeout: 30 seconds  
   - Base URL: https://petstore.octoperf.com/
   - Screenshot and video capture on failure

### Step 2: Test Plan Design

**Method:** Using DesignTestCase.agent.md methodology

1. **Analyze PetStore application:**
   - 7 main features: Login, Logout, Browse Categories, View Pet Details, Add to Cart, Checkout Order, Search Pet
   - Identify workflows and user journeys

2. **Apply test design techniques:**
   - **Boundary Value Analysis:** Test with boundary values (empty inputs, max length)
   - **Equivalence Partitioning:** Partition data into equivalent groups
   - **Decision Table Testing:** Test logic combinations
   - **State Transition Testing:** Test state transitions
   - **Error Guessing:** Test common error scenarios

3. **Create comprehensive test plan:**
   - File: `petstore-comprehensive-test-plan.md`
   - Total: 47 test cases
   - Distribution: F1(6), F2(3), F3(5), F4(8), F5(6), F6(10), F7(7), Smoke(2)

### Step 3: Build Page Object Model

**Method:** Create page object classes for reusability and maintainability

1. **Create Page Object classes:**
   ```
   tests/page-objects/
   ├── HomePage.ts              # Home page
   ├── LoginPage.ts             # Login page
   ├── MainCatalogPage.ts       # Main catalog
   ├── CategoryPage.ts          # Category page
   ├── ProductPage.ts           # Product details page
   ├── CartPage.ts              # Shopping cart page
   ├── CheckoutPage.ts          # Checkout page
   └── SearchResultsPage.ts     # Search results page
   ```

2. **Setup Fixture system:**
   - File: `tests/fixtures/pageObjectsFixtureComplete.ts`
   - Dependency injection for page objects
   - Automatic page object initialization for each test

### Step 4: Generate Test Scripts

**Method:** Using GenerateTestScript.agent.md methodology with Playwright MCP tools

1. **Use MCP tools to generate scripts:**
   - `mcp_playwright-te_test_setup`: Setup test environment
   - `mcp_playwright-te_browser_navigate_to`: Navigation
   - Element interaction tools
   - `mcp_playwright-te_generator_write_test`: Create test files

2. **Generate test scripts for each feature:**

   **Feature 1: User Authentication (6 tests)**
   - TC_F1_001: Valid login
   - TC_F1_002: Invalid username  
   - TC_F1_003: Invalid password
   - TC_F1_004: Empty credentials
   - TC_F1_005: SQL injection attempt
   - TC_F1_006: Case sensitivity

   **Feature 2: User Logout (3 tests)**
   - TC_F2_001: Standard logout
   - TC_F2_002: Logout from different pages
   - TC_F2_003: Session cleanup verification

   **Feature 3: Browse Categories (5 tests)**
   - TC_F3_001: View all categories
   - TC_F3_002: Navigate to specific category
   - TC_F3_003: Category with products
   - TC_F3_004: Empty category
   - TC_F3_005: Category navigation flow

   **Feature 4: View Pet Details (8 tests)**
   - TC_F4_001-008: Product details, images, add to cart từ different contexts

   **Feature 5: Add to Cart (6 tests)**
   - TC_F5_001-006: Add products, quantity updates, cart management

   **Feature 6: Checkout Order (10 tests)**
   - TC_F6_001-010: Complete checkout process, form validation, order confirmation

   **Feature 7: Search Pet (7 tests)**
   - TC_F7_001-007: Search functionality, results validation, edge cases

### Step 5: Test Execution and Debugging

1. **Run all test scripts:**
   ```bash
   npx playwright test --headed
   ```

2. **Debug and fix common issues:**

   **Import path errors:**
   - Problem: Incorrect import paths from fixtures
   - Solution: Update from `'./page-objects/'` to `'../page-objects/'`

   **Unstable selector errors:**
   - Problem: Welcome message selector changes
   - Solution: Use regex patterns instead of exact text

   **Empty results handling errors:**
   - Problem: Search no results not handled correctly
   - Solution: Improve logic for checking empty table state

3. **Validation coverage:**
   - 45+ test scripts created and verified
   - Full coverage for 7 features
   - All tests passing after debugging

### Step 6: Best Practices Applied

1. **Page Object Model:**
   - Separate test logic and UI interaction
   - Reusable components
   - Easy maintenance

2. **Fixture Pattern:**
   - Dependency injection
   - Setup/teardown automation
   - Clean test isolation

3. **Robust Selectors:**
   - Prefer data-testid attributes
   - Fallback strategies with multiple selectors
   - Regex patterns for dynamic content

4. **Error Handling:**
   - Comprehensive error scenarios
   - Graceful failures
   - Detailed error reporting

## Results Achieved

### Test Coverage
- **Total test cases:** 47 (designed) + 45+ (implemented scripts)
- **Features coverage:** 7/7 (100%)
- **Test execution:** All tests passing
- **Code quality:** Following TypeScript best practices

### Metrics
- **Total test files:** 45+ test scripts
- **Page Objects:** 8 classes
- **Fixtures:** 3 fixture files
- **Test execution time:** ~5-10 minutes for full suite
- **Maintenance score:** High (thanks to Page Object Model)

## How to Run Tests

### Run all tests
```bash
npx playwright test
```

### Run tests by feature
```bash
npx playwright test tests/login/
npx playwright test tests/cart/
npx playwright test tests/search/
```

### Run with headed mode (view browser)
```bash
npx playwright test --headed
```

### Run specific test
```bash
npx playwright test tests/login/TC_F1_login_test_cases.spec.ts
```

### Debug mode
```bash
npx playwright test --debug
```

## Technologies and Tools Used

- **Framework:** Playwright with TypeScript
- **Pattern:** Page Object Model
- **Architecture:** Fixture-based dependency injection  
- **AI Integration:** MCP (Model Context Protocol) server
- **Test Design:** Multiple testing techniques (BVA, EP, DTT, STT, EG)
- **Browser:** Chromium (headed mode)
- **Reporting:** Built-in Playwright HTML reports

## Reference Documentation

- [petstore-comprehensive-test-plan.md](petstore-comprehensive-test-plan.md) - Detailed test plan
- [DesignTestCase.agent.md](DesignTestCase.agent.md) - Test design methodology
- [GenerateTestScript.agent.md](GenerateTestScript.agent.md) - Script generation methodology
- [Playwright Documentation](https://playwright.dev/) - Official docs

## Contact and Support

This project was implemented with AI Agent assistance using Playwright MCP tools to automate test script creation and management.

---

**Completion time:** Fully completed with 7 features covered 100%
**Status:** ✅ All tests passing and ready for production use