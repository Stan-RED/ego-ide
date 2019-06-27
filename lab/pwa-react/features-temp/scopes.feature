Feature: As a user, I want to be able to add a new scope to structurize all my tasks.

Scenario: Main Dashboard
    # TODO: steps just running mutations (without an UI)
    Given Stan has scope skills
    When Focus is Stan
    Then Widget links
    Then Widget workspace
    Then Widget actions log

Scenario: See the list of root scopes
    Given Focus is Stan
    # When Navigate to scopes
    When Widget navigate to scopes
    Then Widget scopes:
        |skills|
        |projects|

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
    When Widget scopes action add
    And I submit the form:
        |name|
        |tasks|
    # Then I should be on the "scopes" page
    Then Widget scopes:
        |skills|
        |projects|
        |tasks|

# Scenario: Add a new scope
#     Given I am on the "add scopes" page
#     When I fill in the form:
#         | name |
#         | tasks |
#     And I submit the form
#     Then I should be on the "scopes" page
#     And Widget scopes:
#         |skills|
#         |projects|
#         |tasks|

# Feature: As a user, I want to divide two numbers

# Background:
#     Given a calculator

# Scenario: Divide two numbers
#     # Given a calculator
#     When I divide 6 by 2
#     Then the result is 3

# Scenario Outline: Dividing
# #   Given a calculator
#   When I divide <n1> by <n2>
#   Then the result is <result>

#   Examples:
#     | n1 | n2 | result |
#     | 10 |  2 |    5   |
#     | 33 |  3 |   11   |


# Given there are users:
#   | username | password | email               |
#   | everzet  | 123456   | everzet@knplabs.com |
#   | fabpot   | 22@222   | fabpot@symfony.com  |