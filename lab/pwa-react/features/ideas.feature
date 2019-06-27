Feature: TODO

    Background:
        Given User Stan
        And Current user is Stan

    Scenario: Add a scope
        Given Focus was Stan
        When Add scope Tasks
        Then Focus is Tasks

    Scenario: List scopes
        Given Focus was Stan
        And Stan had scope Tasks
        When Select scope
        Then Widget Scopes list
            | scope | Tasks |
