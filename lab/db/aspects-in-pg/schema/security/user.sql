/*
  @statement {id} is identified in system by {login}
 */
CREATE TABLE security.user (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,

  login text NOT NULL
) WITHOUT OIDS;
