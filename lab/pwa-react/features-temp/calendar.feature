Feature: As a user, I want to be able to add a new event to the calendar.

Scenario: See the list of events
    Given Focus is Stan
    When Navigate to calendar
    Then Widget calendar:
        |event|date|
        |EventMeeting|TODO|
        |EventTrip|TODO|

Scenario: See the list of child scopes
    Given Focus is Skills
    Then Widget scopes:
        |skill|cs|
        |skill|diy|
        |project|ide.run|

Scenario: Add a new scope
    Given Widget scopes
    # Given I am on the "scopes" page
    # When I click on the Add scope in the scopes widget actions
    When Widget scopes:
        |action|
        |add|
    And I submit the form:
        | name |
        | tasks |
    # Then I should be on the "scopes" page
    Then Widget scopes:
        |skills|
        |projects|
        |tasks|
