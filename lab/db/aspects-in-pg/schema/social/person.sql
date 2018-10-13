-- Person --------------------------------------------------------------------
CREATE TABLE social.person (
  id system.oid NOT NULL,
    CONSTRAINT pk_social_person PRIMARY KEY(id),
    CONSTRAINT fk_social_person_id FOREIGN KEY (id) REFERENCES system.entity(id),

  firstName text,
  lastName text
) WITHOUT OIDS ;
