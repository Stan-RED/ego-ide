/*
  Relation between two particular entities.

  @statement {id} relates to {target} as {relation}.
*/
CREATE TABLE system.link (
  id system.oid NOT NULL,
    CONSTRAINT pk_system_link PRIMARY KEY(id),
    CONSTRAINT fk_system_link_id FOREIGN KEY(id) REFERENCES system.entity(id),

  -- Link is between id and this target.
  target system.oid NOT NULL,
    CONSTRAINT fk_system_link_target FOREIGN KEY(target) REFERENCES system.entity(id),

  -- Any entity can be a relation, but system.relation expected to
  -- be used pretty frequently.
  relation system.oid NULL,
    CONSTRAINT fk_system_link_relation FOREIGN KEY(relation) REFERENCES system.entity(id)

) WITHOUT OIDS;
