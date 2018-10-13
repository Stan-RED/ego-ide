/*
  Simple text representation aspect.

  @statement {id} as text is {text}.
*/
CREATE TABLE content.text (
  id system.oid NOT NULL,
    CONSTRAINT pk_content_text PRIMARY KEY (id),
    CONSTRAINT fk_content_text_id FOREIGN KEY (id) REFERENCES system.entity(id),

  text text NOT NULL
) WITHOUT OIDS ;
