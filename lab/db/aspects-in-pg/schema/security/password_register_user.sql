/*
  Registration mutation

  mutation Register() {
    entity {
      user(login: @login) {
        password(target: $parent.id, hash: @hash)
      }
      person(firstName: 'Stan', lastName: 'Ya')
    }
  }
 */
CREATE OR REPLACE FUNCTION security.user_register_with_password(
  login text,
  hash bytea
)
RETURNS
  system.oid
AS $$
DECLARE
  _user_id system.oid;
  _password_id system.oid;
BEGIN

_user_id = 'user-' || password_register_user.login;
_password_id = 'password-' || password_register_user.login;

INSERT INTO system.entity(id, owner) VALUES(_user_id, _user_id);

INSERT INTO security.user(id, login) VALUES(_user_id, password_register_user.login);

INSERT INTO system.entity(id, owner) VALUES(_password_id, _user_id);
INSERT INTO system.link VALUES(_password_id, _user_id, 'relation-auth');
INSERT INTO security.password VALUES(_password_id, '!qa2Ws3eD');

RETURN _user_id;

END $$ LANGUAGE plpgsql;
