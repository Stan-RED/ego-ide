/*
  Relation between two particular entities.

  @statement {id} relates to {target} as {relation}.

  TODO: Type can be some specific relation entity, for instance
  - attachment with file content, etc. But may be also reference to
  some "relation" type entity with values like "composition",
  "delegation", "etc".
*/
CREATE TABLE system.link (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  target system.oid NOT NULL
    REFERENCES system.entity,
  relation system.oid
    REFERENCES system.entity
) WITHOUT OIDS;
