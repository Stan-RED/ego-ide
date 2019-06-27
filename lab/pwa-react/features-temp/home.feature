Feature: As a user, I want to see greetings on the home page

Scenario: See greetings
    Given I am on the home page
    Then I should see "greetings"



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