/*
  System schema is responsible for such aspect as a structure
  of all other elements.
*/
CREATE SCHEMA system;

CREATE DOMAIN system.oid AS text;

\i schema/system/entity.sql
\i schema/system/link.sql
