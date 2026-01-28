# PetStore Demo Application - Comprehensive Test Plan

## Application Overview

Comprehensive test plan for PetStore Demo Application following testing design methodologies. Applied techniques include Boundary Value Analysis, Equivalence Partitioning, Decision Table Testing, State Transition Testing, and Error Guessing to ensure thorough coverage of all acceptance criteria and edge cases.

## Test Scenarios

### 1. Feature 1: User Login Test Cases

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_F1_AC1_Valid_Login_Success

**File:** `tests/login/TC_F1_AC1_valid_login_success.spec.ts`

**Steps:**
  1. Navigate to PetStore and access login page
    - expect: Application loads successfully
    - expect: Login form is accessible
  2. Enter valid username 'j2ee' and password 'j2ee' and submit
    - expect: Valid credentials j2ee/j2ee are accepted
    - expect: User is logged in successfully
    - expect: Welcome message displays logged-in state
    - expect: Sign Out option appears
    - expect: My Account option is visible

#### 1.2. TC_F1_AC1_Valid_Login_Demo_Account

**File:** `tests/login/TC_F1_AC1_valid_login_demo.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login form is displayed
  2. Enter valid username 'demo' and password 'demo' and submit
    - expect: Valid credentials demo/demo are accepted
    - expect: User is logged in successfully
    - expect: Account-specific features are accessible

#### 1.3. TC_F1_AC2_Invalid_Password_Error

**File:** `tests/login/TC_F1_AC2_invalid_password.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login form is ready for input
  2. Enter valid username 'j2ee' with invalid password 'wrongpass'
    - expect: Error message is displayed for invalid password
    - expect: User remains on login page
    - expect: No authentication granted

#### 1.4. TC_F1_AC3_Invalid_Username_Error

**File:** `tests/login/TC_F1_AC3_invalid_username.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login form accepts input
  2. Enter invalid username 'invaliduser' with any password
    - expect: Error message is displayed for invalid username
    - expect: Authentication is denied
    - expect: Login form remains active

#### 1.5. TC_F1_AC4_Empty_Username_Validation

**File:** `tests/login/TC_F1_AC4_empty_username_validation.spec.ts`

**Steps:**
  1. Access login page
    - expect: Login form is displayed
  2. Leave username empty and enter password 'j2ee', then submit
    - expect: Validation error for empty username
    - expect: Form submission is prevented
    - expect: Required field indicator appears

#### 1.6. TC_F1_AC5_Empty_Password_Validation

**File:** `tests/login/TC_F1_AC5_empty_password_validation.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login form is ready
  2. Enter username 'j2ee' and leave password empty, then submit
    - expect: Validation error for empty password
    - expect: Form submission is blocked
    - expect: Password required message appears

#### 1.7. TC_F1_EDGE_SQL_Injection_Security

**File:** `tests/login/TC_F1_EDGE_sql_injection.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login form accepts special characters
  2. Enter SQL injection strings like "'; DROP TABLE users; --" in username/password fields
    - expect: SQL injection attempt is properly handled
    - expect: No database errors exposed
    - expect: Security measures prevent unauthorized access

#### 1.8. TC_F1_EDGE_Special_Characters_Handling

**File:** `tests/login/TC_F1_EDGE_special_characters.spec.ts`

**Steps:**
  1. Access login page
    - expect: Login form handles special characters
  2. Test various special characters (@#$%^&*) in username and password fields
    - expect: Special characters are processed correctly
    - expect: No system errors occur
    - expect: Appropriate validation messages

### 2. Feature 2: User Logout Test Cases

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_F2_AC1_Successful_Logout

**File:** `tests/logout/TC_F2_AC1_successful_logout.spec.ts`

**Steps:**
  1. Login with valid credentials j2ee/j2ee
    - expect: User is successfully logged in
    - expect: Sign Out option is visible
  2. Click Sign Out link
    - expect: User is logged out successfully
    - expect: Redirected to home page
    - expect: Sign In option replaces Sign Out
    - expect: User session is terminated

#### 2.2. TC_F2_AC2_Logout_Redirect_Homepage

**File:** `tests/logout/TC_F2_AC2_redirect_homepage.spec.ts`

**Steps:**
  1. Complete login process
    - expect: User is logged in
  2. Execute logout and verify redirection
    - expect: User is redirected to main page
    - expect: Homepage elements are displayed
    - expect: No logged-in state indicators remain

#### 2.3. TC_F2_AC3_Logout_Option_Visibility

**File:** `tests/logout/TC_F2_AC3_logout_visibility.spec.ts`

**Steps:**
  1. Login and verify authenticated state
    - expect: User session is active
  2. Complete logout and verify UI state changes
    - expect: Sign Out option is no longer visible
    - expect: Only guest user options remain
    - expect: Protected features are inaccessible

#### 2.4. TC_F2_EDGE_Session_Timeout_Handling

**File:** `tests/logout/TC_F2_EDGE_session_timeout.spec.ts`

**Steps:**
  1. Login and wait for potential session timeout
    - expect: User session exists
  2. Test session timeout behavior
    - expect: Session timeout is handled gracefully
    - expect: User is automatically logged out if timeout occurs
    - expect: Appropriate messaging is displayed

### 3. Feature 3: Browse Pet Categories Test Cases

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_F3_AC1_Category_List_Display

**File:** `tests/browsing/TC_F3_AC1_category_list_display.spec.ts`

**Steps:**
  1. Navigate to main catalog page and verify category display
    - expect: All pet categories are displayed
    - expect: Fish, Dogs, Cats, Reptiles, Birds categories are visible
    - expect: Each category shows appropriate description

#### 3.2. TC_F3_AC2_Category_Click_Navigation

**File:** `tests/browsing/TC_F3_AC2_category_navigation.spec.ts`

**Steps:**
  1. Locate Fish category on main page
    - expect: Category is clickable
  2. Click on Fish category
    - expect: Pet list page is displayed for Fish
    - expect: Products are listed with details
    - expect: Navigation shows current category context

#### 3.3. TC_F3_AC3_Pet_Item_Details_Display

**File:** `tests/browsing/TC_F3_AC3_pet_item_details.spec.ts`

**Steps:**
  1. Navigate to any pet category (Fish)
    - expect: Pet category page is loaded
  2. Verify pet item display includes name, description, and price
    - expect: Each pet shows name clearly
    - expect: Description is visible for each pet
    - expect: Price information is displayed

#### 3.4. TC_F3_EDGE_All_Categories_Functional

**File:** `tests/browsing/TC_F3_EDGE_all_categories.spec.ts`

**Steps:**
  1. Test navigation to each category: Fish, Dogs, Cats, Reptiles, Birds
    - expect: All categories are accessible
  2. Verify functionality across all pet categories
    - expect: Each category loads successfully
    - expect: Products are displayed in each category
    - expect: No broken links or missing content

#### 3.5. TC_F3_EDGE_Empty_Category_Handling

**File:** `tests/browsing/TC_F3_EDGE_empty_category.spec.ts`

**Steps:**
  1. Navigate to a category that might be empty
    - expect: Category page loads
  2. Verify empty category behavior
    - expect: Empty state is handled gracefully
    - expect: Appropriate message for no products
    - expect: Navigation remains functional

### 4. Feature 4: View Pet Details Test Cases

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_F4_AC1_Pet_Detail_Page_Display

**File:** `tests/pet-details/TC_F4_AC1_pet_detail_page.spec.ts`

**Steps:**
  1. Navigate to Fish category
    - expect: Pet list is displayed
  2. Select Angelfish from the pet list
    - expect: Pet detail page opens
    - expect: Selected pet information is displayed

#### 4.2. TC_F4_AC2_Pet_Name_Display

**File:** `tests/pet-details/TC_F4_AC2_pet_name_display.spec.ts`

**Steps:**
  1. Access Angelfish product details
    - expect: Pet detail page is loaded
  2. Verify pet name is prominently shown
    - expect: Pet name 'Angelfish' is clearly displayed
    - expect: Name matches the selected product

#### 4.3. TC_F4_AC2_Description_Display

**File:** `tests/pet-details/TC_F4_AC2_description_display.spec.ts`

**Steps:**
  1. Navigate to any pet detail page
    - expect: Pet detail page is accessible
  2. Verify description content is displayed
    - expect: Product description is visible
    - expect: Description provides relevant pet information

#### 4.4. TC_F4_AC2_Price_Display

**File:** `tests/pet-details/TC_F4_AC2_price_display.spec.ts`

**Steps:**
  1. Access pet details with multiple variants (Angelfish)
    - expect: Pet detail page shows product variants
  2. Verify price information display
    - expect: Price is clearly displayed ($16.50)
    - expect: Price format is consistent
    - expect: All variant prices are shown

#### 4.5. TC_F4_AC2_Add_Cart_Button_Present

**File:** `tests/pet-details/TC_F4_AC2_add_cart_button.spec.ts`

**Steps:**
  1. Navigate to pet details
    - expect: Pet detail page is displayed
  2. Verify Add to Cart button presence and accessibility
    - expect: Add to Cart button is visible
    - expect: Button is clickable and functional

### 5. Feature 5: Add Pet to Cart Test Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_F5_AC1_Add_Pet_To_Cart

**File:** `tests/cart/TC_F5_AC1_add_pet_to_cart.spec.ts`

**Steps:**
  1. Navigate to Angelfish product page
    - expect: Pet detail page with Add to Cart option
  2. Click 'Add to Cart' for Large Angelfish (EST-1)
    - expect: Pet appears in cart
    - expect: Cart displays the added pet
    - expect: Success confirmation is shown

#### 5.2. TC_F5_AC2_Cart_Quantity_Display

**File:** `tests/cart/TC_F5_AC2_cart_quantity_display.spec.ts`

**Steps:**
  1. Add Large Angelfish to cart
    - expect: Item is added to cart
  2. Verify cart shows accurate quantity information
    - expect: Cart displays correct quantity (1)
    - expect: Quantity is clearly visible
    - expect: Default quantity is set properly

#### 5.3. TC_F5_AC3_Cart_Price_Display

**File:** `tests/cart/TC_F5_AC3_cart_price_display.spec.ts`

**Steps:**
  1. Add pet item to shopping cart
    - expect: Item is in cart
  2. Verify cart shows correct pricing
    - expect: Cart displays correct price ($16.50)
    - expect: Price matches product listing
    - expect: Total calculation is accurate

#### 5.4. TC_F5_AC4_Multiple_Pets_Cart

**File:** `tests/cart/TC_F5_AC4_multiple_pets_cart.spec.ts`

**Steps:**
  1. Add Large Angelfish (EST-1) to cart
    - expect: First pet is added successfully
  2. Add Small Angelfish (EST-2) to verify multiple pet handling
    - expect: Multiple pets appear in cart
    - expect: Each pet maintains separate entry
    - expect: Quantities and prices are independent

#### 5.5. TC_F5_EDGE_Cart_Quantity_Limits

**File:** `tests/cart/TC_F5_EDGE_cart_limit.spec.ts`

**Steps:**
  1. Add items with various quantities (1, 5, 10)
    - expect: Cart accepts normal quantities
  2. Test boundary values for cart quantities
    - expect: System handles quantity limits appropriately
    - expect: Error messages for invalid quantities
    - expect: Cart maintains integrity

#### 5.6. TC_F5_EDGE_Duplicate_Item_Handling

**File:** `tests/cart/TC_F5_EDGE_duplicate_items.spec.ts`

**Steps:**
  1. Add EST-1 to cart
    - expect: Item is already in cart
  2. Add the same item (EST-1) again to cart
    - expect: Duplicate addition is handled correctly
    - expect: Quantity increases or separate entries
    - expect: No cart corruption occurs

### 6. Feature 6: Checkout Order Test Cases

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_F6_AC1_Checkout_Access_Logged_In

**File:** `tests/checkout/TC_F6_AC1_checkout_access.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in successfully
  2. Add pet to cart
    - expect: Cart contains at least one pet
  3. Navigate from cart to checkout
    - expect: Proceed to checkout option is available
    - expect: Checkout process is accessible

#### 6.2. TC_F6_AC2_Order_Summary_Display

**File:** `tests/checkout/TC_F6_AC2_order_summary.spec.ts`

**Steps:**
  1. Proceed to checkout with items in cart
    - expect: Checkout process is initiated
  2. Verify order summary information
    - expect: Order summary is displayed correctly
    - expect: Items, quantities, and prices are accurate
    - expect: Total calculations are correct

#### 6.3. TC_F6_AC3_Order_Confirmation

**File:** `tests/checkout/TC_F6_AC3_order_confirmation.spec.ts`

**Steps:**
  1. Reach order confirmation stage
    - expect: Order summary is displayed
  2. Locate and interact with order confirmation
    - expect: User can confirm the order
    - expect: Confirmation action is available

#### 6.4. TC_F6_AC4_Order_Placed_Successfully

**File:** `tests/checkout/TC_F6_AC4_order_success.spec.ts`

**Steps:**
  1. Complete checkout process through confirmation
    - expect: Order is ready for confirmation
  2. Submit final order confirmation
    - expect: Order is placed successfully
    - expect: System processes the order

#### 6.5. TC_F6_AC5_Confirmation_Message_Display

**File:** `tests/checkout/TC_F6_AC5_confirmation_message.spec.ts`

**Steps:**
  1. Complete entire checkout process
    - expect: Order is successfully placed
  2. Verify confirmation message and order completion
    - expect: Confirmation message is displayed
    - expect: Success notification appears
    - expect: Order details are provided

#### 6.6. TC_F6_EDGE_Checkout_Without_Login

**File:** `tests/checkout/TC_F6_EDGE_checkout_not_logged_in.spec.ts`

**Steps:**
  1. Add items to cart without authentication
    - expect: User is not logged in
    - expect: Cart has items
  2. Attempt checkout without being logged in
    - expect: Checkout requires login
    - expect: User is redirected to authentication
    - expect: Cart is preserved during login

#### 6.7. TC_F6_EDGE_Empty_Cart_Checkout

**File:** `tests/checkout/TC_F6_EDGE_empty_cart_checkout.spec.ts`

**Steps:**
  1. Ensure authenticated user with no cart items
    - expect: User is logged in
    - expect: Cart is empty
  2. Attempt checkout with empty cart
    - expect: Empty cart checkout is prevented
    - expect: Appropriate guidance provided
    - expect: User directed to shopping

### 7. Feature 7: Search Pet Test Cases

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_F7_AC1_Keyword_Search_Results

**File:** `tests/search/TC_F7_AC1_keyword_search.spec.ts`

**Steps:**
  1. Locate search box on main page
    - expect: Search functionality is available
  2. Enter keyword 'fish' and execute search
    - expect: Search is executed
    - expect: Relevant pets are displayed
    - expect: Results match search keyword

#### 7.2. TC_F7_AC2_Relevant_Search_Results

**File:** `tests/search/TC_F7_AC2_relevant_results.spec.ts`

**Steps:**
  1. Search for 'angelfish'
    - expect: Search returns results
  2. Verify search result relevancy
    - expect: Results are relevant to search term
    - expect: Angelfish products appear in results
    - expect: Irrelevant items are excluded

#### 7.3. TC_F7_AC3_No_Results_Message

**File:** `tests/search/TC_F7_AC3_no_results_message.spec.ts`

**Steps:**
  1. Enter search term that yields no results 'xyz123'
    - expect: Search functionality works
  2. Verify no results messaging
    - expect: 'No results found' message is displayed
    - expect: Empty state is handled gracefully
    - expect: User guidance is provided

#### 7.4. TC_F7_EDGE_Empty_Search_Handling

**File:** `tests/search/TC_F7_EDGE_empty_search.spec.ts`

**Steps:**
  1. Leave search field blank and submit
    - expect: Search box is empty
  2. Test empty search submission
    - expect: Empty search is handled appropriately
    - expect: Validation message or all products shown
    - expect: No system errors occur

#### 7.5. TC_F7_EDGE_Special_Characters_Search

**File:** `tests/search/TC_F7_EDGE_special_characters.spec.ts`

**Steps:**
  1. Enter special characters (@#$%^&*) in search
    - expect: Search accepts various inputs
  2. Test search with special characters
    - expect: Special characters are processed safely
    - expect: No system errors or crashes
    - expect: Appropriate handling of unusual input

#### 7.6. TC_F7_EDGE_Search_SQL_Injection

**File:** `tests/search/TC_F7_EDGE_sql_injection_search.spec.ts`

**Steps:**
  1. Enter SQL injection attempts in search box
    - expect: Search field accepts input
  2. Test search security with injection attempts
    - expect: SQL injection is prevented
    - expect: No database errors exposed
    - expect: Security measures are effective

#### 7.7. TC_F7_BOUNDARY_Long_Search_String

**File:** `tests/search/TC_F7_BOUNDARY_long_search.spec.ts`

**Steps:**
  1. Enter very long search string (500+ characters)
    - expect: Search field accepts lengthy input
  2. Test boundary limits for search string length
    - expect: Long search strings are handled appropriately
    - expect: No performance issues
    - expect: Input limits are respected
