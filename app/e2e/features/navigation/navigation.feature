Feature: Navigation

  Allows users to navigate the various apps available.

  Scenario: Tenant Admin see all the available apps in the nav bar
    When "Jay Smith - Tenant Admin for test-6789" logs in with email and password
    Then They see they are able to navigate to these apps:
      | name      |
      | dashboard |
      | handbook  |

  Scenario: Tenant Dashboard user sees limited available apps in the nav bar
    When "Kate Fore - Tenant dashboard user for test-6789" logs in with email and password
    Then They see they are able to navigate to these apps:
      | name      |
      | dashboard |
    Then They do not see they are able to navigate to these apps:
      | name     |
      | handbook |


