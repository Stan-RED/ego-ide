/*
  mutation InboxMail($inbox, $subject, $content, $from, $recipients) {
    email(subject: $subject, content: $content, from: $from, recipients: $recipients) {
      inbox(id: $parent.id, target: $inbox, relation: 'inbox') {}
    }
  }
 */
CREATE OR REPLACE FUNCTION content.inbox_add_email(
  owner system.oid,
  inbox system.oid,
  subject text,
  content text,
  sender text,
  recipients text[]
)
RETURNS
  system.oid
AS $$
DECLARE
  _subject text;
  _inbox system.oid;
  _result system.oid;
BEGIN
  _subject = LOWER(REGEXP_REPLACE(inbox_add_email.subject, '[\s\.]', '-', 'g'));
  _result = 'email-' || inbox_add_email.inbox || '-' || _subject;
  _inbox = 'inbox-' || inbox_add_email.inbox || '-' || _subject;

  INSERT INTO system.entity (id, owner) VALUES(_result, owner);

  INSERT INTO content.email (
    id,
    subject,
    content,
    sender,
    recipients
  ) VALUES (
    _result,
    inbox_add_email.subject,
    inbox_add_email.content,
    inbox_add_email.sender,
    inbox_add_email.recipients
  );

  INSERT INTO system.link (
    id,
    target,
    relation
  ) VALUES (
    _result,
    inbox_add_email.inbox,
    'relation-inbox'
  );

  RETURN _result;
END $$ LANGUAGE plpgsql;
