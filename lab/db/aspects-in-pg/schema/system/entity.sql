/*
  Entity is a basic "atom" of the system. Each other object
  is an entity.

  @statement There is an {entity}.
 */
CREATE TABLE system.entity (
  id system.oid NOT NULL,
    CONSTRAINT pk_system_eneity PRIMARY KEY(id),

  owner system.oid NOT NULL,
    CONSTRAINT fk_system_entity_owner FOREIGN KEY(owner) REFERENCES system.entity(id)
) WITHOUT OIDS;
