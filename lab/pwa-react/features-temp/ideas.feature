Feature: TODO

    Widget types:
    View widget is
    Additional view widgets are
    Navigation widget is

    # TODO: Might be excessive. Possible to be done with hooks
    # on the main navigational widget
    Additional navigation widgets are
    Workspace widget is

    # is - for aspects
    # has - for links
    Background:
        Given User Stan
        And Stan has scope Skills
        And Current user is Stan

    # TODO:
    Scenario: 0
        When Stan is identificated
        Then Focus is Stan
        And View widget is User
        And Additional view widgets are X,Y
        # TODO: workspace might just be a different widgets collection?
        And Workspace widget is Workspace
        And Navigation widget is Navigation
        # TODO: Might be excessive. Possible to be done with hooks
        # on the main navigational widget
        And Additional navigation widgets are A,B

    Scenario: Add a scope
        Given Focus was Stan
        When Add scope Tasks
            | setting1 |
            | value1   |
        Then Focus is Tasks

    Scenario: List scopes
        Given Focus was Stan
        When Select scope
        Then Widget Scopes list
            | scope | tasks |

    Scenario: Attach mail provider to the inbox
        Given Focus was Stan
        And IMAP has mail MailId
        When Select inbox
        And Configure Widget Mail
            | smtp | login | password |
            | ...  | ...   | ...      |
        And Sync Widget Mail
        Then Widget Inbox list has MailId

    Scenario: Link existing text to the inbox
        Given Stan had text TextId
        And Focus is TextId
        When Add aspect inbox
        And Select Inbox
        Then Widget Inbox list has TextId

    Scenario: Add a meeting
        Given Stan had text MeetingId
        And Focus is MeetingId
        When Select Calendar
        And Add Calendar on someDate
        Then Widget Calendar list has MeetingId

    Scenario: Add a note to the inbox
        Given Focus was Stan
        When Add inbox/text TextId
        And Select Inbox
        Then Widget Inbox list has TextId

    Scenario: Write a direct message to another user
        Given Current user was Stan
        # TODO: Yavulan shoud exists
        And Focus is Yavulan
        When Add message/text MessageId
        And Select Messages
        Then Widget Messages list has MessageId

    Scenario: Add current focus to favourites
        Given Focus was Yavulan
        When Add favourites
        Then Widget Favourites list has Yavulan

    Scenario: Change my password
        Given Focus was Stan
        When Select identity/password
        When Update Widget Password:
            | oldPass | newPass |
        When WORK: Logout
        Then WORK: Successfully signin

    Scenario: Create a project with the ticket and attach the priority and users group
    Scenario: Mention a user in the conversation
    Scenario: Create kanban dashboard
    Scenario: Create chat and invite users to the chat