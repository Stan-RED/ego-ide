DROP TABLE IF EXISTS topic;
DROP TABLE IF EXISTS file;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS relation;
DROP TABLE IF EXISTS workspace;
DROP TABLE IF EXISTS entity;

CREATE TABLE entity (
  id text NOT NULL PRIMARY KEY,
  created timestamp NOT NULL DEFAULT current_timestamp,
  deleted timestamp,
  workspace text DEFAULT 'workspace-iderun',
  aspects text[]
) WITHOUT ROWID;

CREATE TABLE workspace (
  id text NOT NULL PRIMARY KEY REFERENCES entity,
  name text NOT NULL,
  parent text NULL
) WITHOUT ROWID;

CREATE TABLE relation (
  id text NOT NULL PRIMARY KEY REFERENCES entity,
  source text NOT NULL REFERENCES entity,
  target text NOT NULL REFERENCES entity
);

CREATE TABLE person (
  id text PRIMARY KEY REFERENCES entity,
  firstName text,
  lastName text
) WITHOUT ROWID;

CREATE TABLE file (
  id text NOT NULL PRIMARY KEY REFERENCES entity,
  name text NOT NULL
);

CREATE TABLE topic (
  id text NOT NULL PRIMARY KEY REFERENCES entity,
  name text NOT NULL
);

-- Workspaces ------------------------------------------------------------------
INSERT INTO entity(id) VALUES
  ('workspace-iderun')
;

INSERT INTO workspace(id, name) VALUES
  ('workspace-iderun', 'ide-run')
;

-- Persons ---------------------------------------------------------------------
INSERT INTO entity(id, aspects) VALUES
  ('person-vitaly', 'person,1'),
  ('person-stan', 'person'),
  ('person-julia', 'person')
;

INSERT INTO person VALUES
  ('person-vitaly', 'Vitaly', 'Cho'),
  ('person-stan', 'Stan', 'Ya'),
  ('person-julia', 'Julia', 'Ya')
;

-- Topics ----------------------------------------------------------------------
INSERT INTO entity(id) VALUES
  ('topic-appartment')
;
--TODO: Обыграть обсуждение квартиры
