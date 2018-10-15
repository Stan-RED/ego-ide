/*
  mutation InboxText($inbox, $text) {
    text(text: $text) {
      inbox(id: $parent.id, target: $inbox, relation: 'inbox') {}
    }
  }
 */
CREATE OR REPLACE FUNCTION content.inbox_add_text(
  owner system.oid,
  inbox system.oid,
  text text
)
RETURNS
  system.oid
AS $$
DECLARE
  _subject text;
  _inbox system.oid;
  _result system.oid;
BEGIN
  _subject = LOWER(REGEXP_REPLACE(inbox_add_text.text, '[\s\.]', '-', 'g'));
  _result = 'text-' || inbox_add_text.inbox || '-' || _subject;
  _inbox = 'inbox-' || inbox_add_text.inbox || '-' || _subject;

  INSERT INTO system.entity (id, owner) VALUES(_result, owner);

  INSERT INTO content.text (
    id,
    text
  ) VALUES (
    _result,
    inbox_add_text.text
  );

  INSERT INTO system.link (
    id,
    target,
    relation
  ) VALUES (
    _result,
    inbox_add_text.inbox,
    'relation-inbox'
  );

  RETURN _result;
END $$ LANGUAGE plpgsql;
