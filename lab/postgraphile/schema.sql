DROP SCHEMA IF EXISTS social CASCADE;
DROP SCHEMA IF EXISTS security CASCADE;
DROP SCHEMA IF EXISTS content CASCADE;
DROP SCHEMA IF EXISTS system CASCADE;
CREATE SCHEMA system;
CREATE SCHEMA security;
CREATE SCHEMA content;
CREATE SCHEMA social;

CREATE DOMAIN system.oid AS text;

CREATE TABLE system.entity (
  id system.oid NOT NULL PRIMARY KEY,
  owner system.oid NOT NULL
    REFERENCES system.entity
) WITHOUT OIDS;

-- Named -----------------------------------------------------------------------
CREATE TABLE content.named (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  name text NOT NULL
) WITHOUT OIDS ;

-- Part ------------------------------------------------------------------------
CREATE TABLE system.part (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  of text NOT NULL
    REFERENCES system.entity
) WITHOUT OIDS;

-- Scope -----------------------------------------------------------------------
CREATE TABLE system.scope (
  id system.oid PRIMARY KEY
    REFERENCES system.part
    REFERENCES content.named
) WITHOUT OIDS;

-- User ------------------------------------------------------------------------
CREATE TABLE security.user (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  login text NOT NULL
) WITHOUT OIDS;

-- Password --------------------------------------------------------------------
CREATE TABLE security.password (
  id system.oid PRIMARY KEY
    REFERENCES system.part,
  password text NOT NULL
) WITHOUT OIDS;

-- Person --------------------------------------------------------------------
CREATE TABLE social.person (
  id system.oid PRIMARY KEY
    REFERENCES system.entity,
  firstName text,
  lastName text
) WITHOUT OIDS ;

-- Initial data ----------------------------------------------------------------
INSERT INTO system.entity VALUES('user-origo', 'user-origo');
INSERT INTO security.user VALUES('user-origo', 'origo');

INSERT INTO system.entity VALUES('password-origo', 'user-origo');
INSERT INTO system.part VALUES('password-origo', 'user-origo');
INSERT INTO security.password VALUES ('password-origo', '!qa2Ws3eD');

-- Activity --------------------------------------------------------------------
DO $ORIGO_AUTH$
DECLARE
  _result text;
  _login text = 'origo';
  _password text = '!qa2Ws3eD';
BEGIN
-- query user($login: origo) { password(of: parent.id, $password: '!qa2Ws3eD'} }

_result = (SELECT
    "user".id
  FROM security.user
    JOIN (
      security.password
      JOIN system.part ON (part.id = password.id)
    ) AS password ON (password.password = _password AND password.of = "user".id)
  WHERE
    login = _login
);

IF _result IS NULL THEN
  RAISE EXCEPTION 'TEST: Valid auth for [%s]', _login;
END IF;

-- wrong password
IF EXISTS(SELECT
  *
FROM
  security.user
  JOIN (
    security.password
    JOIN system.part ON (part.id = password.id)
  ) AS password ON (password.password = 'wrong_pass' AND password.of = "user".id)
WHERE
  login = _login
) THEN
  RAISE EXCEPTION 'TEST: Invalid auth password';
END IF;

-- wrong login
IF EXISTS(SELECT
  *
FROM
  security.user
  JOIN (
    security.password
    JOIN system.part ON (part.id = password.id)
  ) AS password ON (password.password = '!qa2Ws3eD' AND password.of = "user".id)
WHERE
  login = 'wrong_login'
) THEN
  RAISE EXCEPTION 'TEST: Invalid auth login';
END IF;

END $ORIGO_AUTH$ LANGUAGE plpgsql;

/*

--TODO:User registration with person information
/*
mutation user(id: user-stan) {
}
 */

/*
INSERT INTO security.user(id, owner, login) VALUES ('user-stan', 'user-stan', 'stan');
INSERT INTO security.password(id, owner, of, password) VALUES('password-stan', 'user-stan', 'user-stan', '!qa@ws3eD');
INSERT INTO social.person(id, owner, firstName, lastName) VALUES('user-stan', 'user-stan', 'Stan', 'Ya');
select *, TABLEOID::regclass from system.entity;
*/

-- TODO:Наверно придётся переделать на лобовой способ, не получается прикрепить аспект.
-- TODO: owner может быть не самымй лучшим наименованием, можно подумать, что владельцем
-- пароля должен быть этот человек, но это не так. Admin? В том плане, кто занимается
-- администрированием этого объекта?
-- Аспекты могут понадобиться в тех случаях, когда мы добавляем неочевидный аспекет,
-- не определённый наследованием. К слову, наследование можно в базу тоже положить.

/*
-- Workspace -------------------------------------------------------------------
CREATE TABLE ide.aspect (
  id text NOT NULL PRIMARY KEY REFERENCES ide.entity,
  name text NOT NULL,
  description text NULL
);

-- Workspace -------------------------------------------------------------------
CREATE TABLE ide.workspace (
  id text NOT NULL PRIMARY KEY REFERENCES ide.entity,
  name text NOT NULL,
  parent text NULL
);

INSERT INTO ide.entity(id) VALUES
  ('aspect-workspace')
;

INSERT INTO ide.aspect VALUES
  ('a')
;

INSERT INTO ide.workspace(id, name) VALUES
  ('workspace-iderun', 'ide-run')
;

ALTER TABLE
  ide.entity
ADD CONSTRAINT
    fk_entity_workspace
FOREIGN KEY (
    workspace
) REFERENCES
  ide.entity
;

-- Person ----------------------------------------------------------------------
CREATE TABLE ide.person (
  id text PRIMARY KEY REFERENCES ide.entity,
  firstName text,
  lastName text
);

INSERT INTO ide.person VALUES
  ('person-stan', 'Stan Ya')
;

ALTER TABLE
  ide.entity
ADD CONSTRAINT
    fk_entity_owner
FOREIGN KEY (
    owner
) REFERENCES
  ide.person
;

-- Relation --------------------------------------------------------------------
CREATE TABLE ide.relation (
  id text NOT NULL PRIMARY KEY REFERENCES ide.entity,
  source text NOT NULL REFERENCES ide.entity,
  target text NOT NULL REFERENCES ide.entity
);

-- User ------------------------------------------------------------------------
CREATE TABLE ide.membership (
  id text NOT NULL PRIMARY KEY REFERENCES ide.relation,
  start timestamp NULL,
  expire timestamp NULL
);

-- File ------------------------------------------------------------------------
CREATE TABLE ide.file (
  id text NOT NULL PRIMARY KEY REFERENCES ide.entity,
  name text NOT NULL
);

-- Администратор добавляет пользователей ---------------------------------------
INSERT INTO ide.entity(id) VALUES
  ('person-vitaly'),
  ('person-julia'),
  ('membership-vitaly'),
  ('membership-julia')
;

INSERT INTO ide.person VALUES
  ('person-vitaly', 'Vitaly', 'Cho'),
  ('person-julia', 'Julia', 'Ya')
;

INSERT INTO ide.relation VALUES
  ('membership-vitaly', 'person-vitaly', 'workspace-iderun'),
  ('membership-julia', 'person-julia', 'workspace-iderun')
;

INSERT INTO ide.membership(id) VALUES
  ('membership-vitaly'),
  ('membership-julia')
;
*/

/* TODO: Security (membership, role, user).
  - membership хочется использовать в различных случаях, например участники топика.
  - membership по идее должен связывать группу и персону.
  - Тогда role вполне может быть группой.
  - А пермиссия может соединять группу/персону/identity и объект через операцию.
  - workspace - это группа?
  - Время действия можно вынести в аспект.
 */

--TODO: workspace -> space.
--TODO: rule, type/aspect(+description)? Задача - побольше документирования.
--TODO: Обыграть обсуждение квартиры
--TODO: Обыграть типовые задачи, регулярные, выбор образования (comparison, pros/cons),
-- аспект приоритета, контекста, тега. Как бы я мог организовать задачу выбора университета?
-- начать с создания workspace stanego? Чем workspace/space будет отличаться от топика.
--TODO: Сам ide.run в
--TODO:Вносить серверные фишки, для облачных инсталляций (DevOps). Желательно что-то с k8s сразу.
--TODO:Pros/cons, может аспектируя каким-то параметром (как и values). Точнее, сам pros/cons может быть аспектом.
--  А может здесь должен работать оценочный аппарат.
-- TODO: named -> term или что-то в таком духе. Когда мы его можем "называть по имени".
