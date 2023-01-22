Feature: Sign Out & Login with email and password

  Scenario: Successfully login as a user with email and password
    When "Jay Smith" logs in with email and password
    Then They see the "dashboard"

  Scenario: Fail to login with a non existent account
    When "Tom (No Account) Smith" logs in with email and password
    Then They see the "login"

  Scenario: Redirect to login on successful sign out
    Given "Jay Smith" logs in with email and password
    And They see the "dashboard"
    When They sign out
    Then They see the "login"

  Scenario: Redirect user back to the handbook after successful login
    Given No one is logged in
    And They request to see "handbook"
    And They see the "login"
    Given "Jay Smith" logs in with email and password
    Then They see the "handbook"