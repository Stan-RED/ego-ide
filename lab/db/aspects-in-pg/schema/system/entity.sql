/*
  Entity is a basic "atom" of the system. Each other object
  is an entity.

  @statement There is an {entity}.
 */
CREATE TABLE system.entity (
  id system.oid NOT NULL PRIMARY KEY,
  owner system.oid NOT NULL
    REFERENCES system.entity
) WITHOUT OIDS;
