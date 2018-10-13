DO $$
DECLARE
  _result text;
  _login text = 'origo';
  _password bytea = '!qa2Ws3eD';
  _hash bytea = '!qa2Ws3eD';
BEGIN

-- Valid query -----------------------------------------------------------------
IF security.password_query_user(_login, _hash) IS NULL THEN
  RAISE EXCEPTION 'TEST: Valid auth for [%s]', _login;
END IF;

-- Query with wrong password ---------------------------------------------------
IF security.password_query_user(_login, 'wrong_pass') IS NOT NULL THEN
  RAISE EXCEPTION 'TEST: Invalid auth password';
END IF;

-- Query with wrong login ------------------------------------------------------
IF security.password_query_user('wrong_login', _hash) IS NOT NULL THEN
  RAISE EXCEPTION 'TEST: Valid auth for [%s]', _login;
END IF;

END $$ LANGUAGE plpgsql;

DO $$
DECLARE
  _login text = 'stan';
  _hash bytea = '!qa2Ws3eD';
BEGIN

IF security.password_register_user(_login, _hash) != 'user-stan' THEN
  RAISE EXCEPTION 'TEST: Not valid return after user registration';
END IF;

IF security.password_query_user(_login, _hash) IS NULL THEN
  RAISE EXCEPTION 'TEST: Valid auth for [%s]', _login;
END IF;

RAISE EXCEPTION 'Rollback'; EXCEPTION WHEN others THEN BEGIN END;

END $$ LANGUAGE plpgsql;
