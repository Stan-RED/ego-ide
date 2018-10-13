-- Person --------------------------------------------------------------------
CREATE TABLE social.person (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  firstName text,
  lastName text
) WITHOUT OIDS ;
