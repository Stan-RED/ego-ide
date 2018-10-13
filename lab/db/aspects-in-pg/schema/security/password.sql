-- Password --------------------------------------------------------------------
CREATE TABLE security.password (
  id system.oid PRIMARY KEY
    REFERENCES system.link,
  hash bytea NOT NULL
) WITHOUT OIDS;
