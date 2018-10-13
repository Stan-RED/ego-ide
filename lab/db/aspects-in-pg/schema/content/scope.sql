CREATE TABLE content.scope (
  id system.oid PRIMARY KEY
    REFERENCES system.link
    REFERENCES content.name
) WITHOUT OIDS;
