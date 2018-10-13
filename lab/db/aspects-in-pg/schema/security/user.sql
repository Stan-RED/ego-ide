/*
  @statement {id} is identified in system as {login}
 */
CREATE TABLE security.user (
  id system.oid NOT NULL,
    CONSTRAINT pk_security_user PRIMARY KEY(id),
    CONSTRAINT fk_security_user_id FOREIGN KEY (id) REFERENCES system.entity(id),

  login text NOT NULL
) WITHOUT OIDS;

CREATE UNIQUE INDEX
  ux_security_user_login
ON security.user(
  login
);
