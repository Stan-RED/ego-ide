/*
Authentication query

query user($login: origo) {
  password(target: $parent.id, password: '!qa2Ws3eD'}
}

*/
DO $$
DECLARE
  _result text;
  _login text = 'origo';
  _password bytea = '!qa2Ws3eD';
BEGIN

-- Valid query -----------------------------------------------------------------
_result = (SELECT
    "user".id
  FROM security.user
    JOIN (
      security.password
      JOIN system.link ON (link.id = password.id)
    ) AS password ON (password.hash = _password AND password.target = "user".id)
  WHERE
    login = _login
);

IF _result IS NULL THEN
  RAISE EXCEPTION 'TEST: Valid auth for [%s]', _login;
END IF;

-- Query with wrong password ---------------------------------------------------
IF EXISTS(SELECT
  *
FROM
  security.user
  JOIN (
    security.password
    JOIN system.link ON (link.id = password.id)
  ) AS password ON (password.hash = 'wrong_pass' AND password.target = "user".id)
WHERE
  login = _login
) THEN
  RAISE EXCEPTION 'TEST: Invalid auth password';
END IF;

-- Query with wrong login ------------------------------------------------------
IF EXISTS(SELECT
  *
FROM
  security.user
  JOIN (
    security.password
    JOIN system.link ON (link.id = password.id)
  ) AS password ON (password.hash = '!qa2Ws3eD' AND password.target = "user".id)
WHERE
  login = 'wrong_login'
) THEN
  RAISE EXCEPTION 'TEST: Invalid auth login';
END IF;

END $$ LANGUAGE plpgsql;

/*
Registration mutation

mutation Register() {
  entity(id: 'user-stan') {
    user(login: 'stan') {
      password(target: $parent.id, hash: 1245)
    }
    person(firstName: 'Stan', lastName: 'Ya')
  }
}
 */
BEGIN;

INSERT INTO system.entity(id, owner) VALUES('user-stan', 'user-stan');

INSERT INTO security.user(id, login) VALUES('user-stan', 'stan');

INSERT INTO system.entity(id, owner) VALUES('password-stan', 'user-stan');
INSERT INTO system.link(id, target) VALUES('password-stan', 'user-stan');
INSERT INTO security.password VALUES('password-stan', '!qa2Ws3eD');

INSERT INTO social.person VALUES('user-stan', 'Stan', 'Ya');

ROLLBACK;
