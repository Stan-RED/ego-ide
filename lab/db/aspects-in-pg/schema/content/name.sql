/*
  This aspect implies that we can reference entity it's applied
  to by its name.

  @statement {id} as known as {name}.
*/
CREATE TABLE content.name (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  name text NOT NULL
) WITHOUT OIDS ;
