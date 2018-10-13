/*
  Authentication based on password.
*/
CREATE TABLE security.password (
  id system.oid NOT NULL,
    CONSTRAINT pk_security_password PRIMARY KEY(id),
    CONSTRAINT fk_security_password_id FOREIGN KEY (id) REFERENCES system.link(id),

  hash bytea NOT NULL
) WITHOUT OIDS;
