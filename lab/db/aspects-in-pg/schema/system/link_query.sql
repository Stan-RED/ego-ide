/*
  Query SelectLink($target, $relation) {
    link(target: $target, relation: $relation) {...}
  }
 */
CREATE OR REPLACE FUNCTION system.link_query(
  target system.oid,
  relation system.oid
)
RETURNS
  SETOF system.link
AS $$ SELECT
  *
FROM
  system.link
WHERE
  target = 'user-stan'
  AND relation = 'relation-inbox'
$$ LANGUAGE SQL;
