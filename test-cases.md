# Test Cases — PetStore (example)

## TC_PETSTORE_AC1_AddToCartAndCheckout_Positive
- Title: Add product to cart and complete checkout (happy path)
- Preconditions:
  - Test user exists: username `j2ee` / password `j2ee` (adjust as needed)
  - Application reachable at https://petstore.octoperf.com/
- Steps:
  1. Open Home page.
  2. Sign in with valid credentials.
  3. Navigate to product `FI-SW-01` (Fish - Koi).
  4. Add the product to cart.
  5. Open Cart and proceed to Checkout.
  6. Confirm the order.
- Expected Results:
  - Step 2: login succeeds and user is signed in.
  - Step 4: cart contains the selected product.
  - Step 6: order confirmation page shown with success message.
- Priority: High
- Test Type: Positive

## TC_PETSTORE_AC1_CheckoutWithEmptyCart_Negative
- Title: Attempt checkout with empty cart (negative)
- Preconditions:
  - User not required to be logged in.
  - Cart is empty.
- Steps:
  1. Open Cart page directly.
  2. Attempt to proceed to checkout.
- Expected Results:
  - Proceed to Checkout is not available, or an "empty cart" message is displayed.
- Priority: Medium
- Test Type: Negative

---

Notes:
- Use the above cases to generate Playwright specs. Prefer stable product IDs (e.g., `FI-SW-01`) to reduce flakiness. Capture HTML and screenshots on failures for diagnostics.
# Test Cases - PetStore Demo Application

Feature Set: PetStore Demo Application
Application URL: https://petstore.octoperf.com/

---

## Feature 1: User Login

- **TC_F1_AC1_Login_with_valid_credentials**
  - Pre-conditions: Login page is open; a valid user exists (`j2ee/j2ee` or `demo/demo`).
  - Steps: Enter `j2ee` / `j2ee` and click Login.
  - Expected: Login succeeds, user is redirected to Home/Account page; user name is displayed.
  - Test Data: validUser1: j2ee / j2ee; validUser2: demo / demo
  - Priority: High; Type: Positive

- **TC_F1_AC2_Login_with_invalid_password**
  - Pre-conditions: Login page is open.
  - Steps: Enter `j2ee` / `wrongpass` and click Login.
  - Expected: Authentication error message is displayed; access is denied.
  - Priority: High; Type: Negative

- **TC_F1_AC3_Login_with_invalid_username**
  - Pre-conditions: Login page is open.
  - Steps: Enter `nonexist` / `whatever` and click Login.
  - Expected: Error message shown (username not found / invalid credentials).
  - Priority: Medium; Type: Negative

- **TC_F1_AC4_Username_empty_validation**
  - Pre-conditions: Login page is open.
  - Steps: Leave username empty, enter password `j2ee`, and click Login.
  - Expected: Validation error for username (required); no authentication request is sent.
  - Priority: Medium; Type: Negative

- **TC_F1_AC5_Password_empty_validation**
  - Pre-conditions: Login page is open.
  - Steps: Enter username `j2ee`, leave password empty, and click Login.
  - Expected: Validation error for password (required).
  - Priority: Medium; Type: Negative

---

## Feature 2: User Logout

- **TC_F2_AC1_Logout_success**
  - Pre-conditions: User is logged in (e.g., `j2ee/j2ee`).
  - Steps: Click the Logout button.
  - Expected: User is logged out, session is cleared, and the app redirects to Home.
  - Priority: High; Type: Positive

- **TC_F2_AC2_Redirect_to_home_after_logout**
  - Pre-conditions: User is logged in.
  - Steps: Click Logout.
  - Expected: After logout the current page is Home (URL and content confirm Home).
  - Priority: Medium; Type: Positive

- **TC_F2_AC3_Logout_option_not_visible_after_logout**
  - Pre-conditions: User has logged out.
  - Steps: Inspect header/menu.
  - Expected: Logout option is not visible; Login/Register options are shown instead.
  - Priority: Medium; Type: Positive

- **TC_F2_Negative_Logout_without_login**
  - Pre-conditions: User is not logged in.
  - Steps: Access `/logout` directly or click logout if shown incorrectly.
  - Expected: No logout action performed; redirect to Home or Login; no server error.
  - Priority: Low; Type: Negative

---

## Feature 3: Browse Pet Categories

- **TC_F3_AC1_Home_displays_pet_categories**
  - Pre-conditions: Access the Home page.
  - Steps: Open the Home page.
  - Expected: List of pet categories (e.g., Fish, Dogs, Cats) is displayed; each category shows a name and thumbnail.
  - Priority: Medium; Type: Positive

- **TC_F3_AC2_Click_category_shows_pet_list**
  - Pre-conditions: Home shows categories.
  - Steps: Click a category (e.g., Fish).
  - Expected: The category's pet list page is displayed with its items.
  - Priority: Medium; Type: Positive

- **TC_F3_AC3_pet_item_shows_name_description_price**
  - Pre-conditions: Pet list page contains at least one item.
  - Steps: Inspect each pet item on the listing.
  - Expected: Each item displays name, short description, and price.
  - Priority: Medium; Type: Positive

- **TC_F3_Negative_empty_category_list**
  - Pre-conditions: Category has no items (staging/mock scenario).
  - Steps: Open the empty category.
  - Expected: A "No pets found" message or equivalent is shown; the app does not crash.
  - Priority: Low; Type: Negative

---

## Feature 4: View Pet Details

- **TC_F4_AC1_View_pet_details**
  - Pre-conditions: User is on a pet list page with at least one pet.
  - Steps: Click a pet to view details.
  - Expected: Detail page shows pet name, full description, price, and an Add to Cart button.
  - Priority: High; Type: Positive

- **TC_F4_Negative_missing_pet_details**
  - Pre-conditions: Access a non-existent pet id.
  - Steps: Open the detail URL with an invalid id.
  - Expected: Display "Pet not found" or redirect; the app does not crash.
  - Priority: Low; Type: Negative

---

## Feature 5: Add Pet to Cart

- **TC_F5_AC1_Add_pet_to_cart_single**
  - Pre-conditions: On the pet detail page for pet A.
  - Steps: Click Add to Cart (default quantity 1) and open the Cart.
  - Expected: Pet A appears in the Cart with quantity = 1 and the correct price shown.
  - Priority: High; Type: Positive

- **TC_F5_AC2_Add_multiple_same_pet_updates_quantity**
  - Pre-conditions: On a pet detail page.
  - Steps: Click Add to Cart twice or set quantity = 2 then Add, then open the Cart.
  - Expected: Cart shows the correct quantity and total = unitPrice * quantity.
  - Priority: High; Type: Positive

- **TC_F5_Negative_add_zero_or_invalid_quantity**
  - Pre-conditions: Quantity input is available on the pet detail page.
  - Steps: Enter quantity = 0, negative, or non-numeric and click Add to Cart.
  - Expected: Validation error is shown; item is not added to the cart.
  - Priority: Medium; Type: Negative

- **TC_F5_Negative_out_of_stock_add**
  - Pre-conditions: Pet stock = 0 (mock scenario).
  - Steps: Attempt to Add to Cart.
  - Expected: Out-of-stock message is displayed; item is not added to cart.
  - Priority: Medium; Type: Negative

---

## Feature 6: Checkout Order

- **TC_F6_AC1_Checkout_successful**
  - Pre-conditions: User is logged in; Cart contains at least one item.
  - Steps: Open Cart → Proceed to Checkout → Fill/confirm shipping info → Confirm Order.
  - Expected: Order summary is shown, order is placed successfully, confirmation message and order id are displayed.
  - Priority: High; Type: Positive

- **TC_F6_Negative_checkout_with_empty_cart**
  - Pre-conditions: User is logged in; Cart is empty.
  - Steps: Access Checkout or click Checkout from an empty Cart.
  - Expected: Checkout is blocked; "Cart is empty" message is shown.
  - Priority: Medium; Type: Negative

- **TC_F6_Negative_missing_required_checkout_info**
  - Pre-conditions: Cart has items; required checkout information is left blank.
  - Steps: Leave required fields empty and click Confirm.
  - Expected: Validation errors are shown; order is not placed.
  - Priority: Medium; Type: Negative

---

## Feature 7: Search Pet

- **TC_F7_AC1_Search_returns_relevant_results**
  - Pre-conditions: Page contains a Search field.
  - Steps: Enter keyword `goldfish` and click Search.
  - Expected: Results include pets whose name/description match `goldfish`.
  - Priority: Medium; Type: Positive

- **TC_F7_AC2_Search_no_results_shows_message**
  - Pre-conditions: Search with a non-matching keyword.
  - Steps: Enter `nonexistentpet` and click Search.
  - Expected: "No results found" message is displayed.
  - Priority: Low; Type: Negative

- **TC_F7_Negative_search_input_validation**
  - Pre-conditions: Search box is available.
  - Steps: Enter an empty string or whitespace only and click Search.
  - Expected: Validation is shown or the app returns the full list; the app does not crash.
  - Priority: Low; Type: Negative

---

## Notes
- Test cases are designed to be independent and repeatable. Request further export to CSV/Excel or Playwright scripts if desired.
