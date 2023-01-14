Feature: Login with email and password

  Scenario: Successfully login as a user with email and password
    When "Jay Smith" logs in with email and password
    Then They see the "dashboard" page

  Scenario: Fail to login with a non existent account
    When "Tom (Non Account) Smith" logs in with email and password
    Then They see the "login" page
