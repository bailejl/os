Feature: Login with email and password

  Scenario: Successfully login as a user with email and password
    When "Tenant Admin" logs in with email and password
    Then They see the "dashboard" page
