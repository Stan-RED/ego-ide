-- God user --------------------------------------------------------------------
INSERT INTO system.entity VALUES('user-origo', 'user-origo');
INSERT INTO security.user VALUES('user-origo', 'origo');

-- Relations -------------------------------------------------------------------
-- @statement {link.target} authenticates {link.id}
INSERT INTO system.entity VALUES('relation-auth', 'user-origo');
INSERT INTO system.relation VALUES('relation-auth');

-- @statement {link.target} happened in {link.id}
INSERT INTO system.entity VALUES('relation-inbox', 'user-origo');
INSERT INTO system.relation VALUES('relation-inbox');

-- @statement We investigate {link.target} of {link.id}.
INSERT INTO system.entity VALUES('relation-scope', 'user-origo');
INSERT INTO system.relation VALUES('relation-scope');

-- God authentication ----------------------------------------------------------
INSERT INTO system.entity VALUES('password-origo', 'user-origo');
INSERT INTO system.link VALUES('password-origo', 'user-origo', 'relation-auth');
INSERT INTO security.password VALUES ('password-origo', '!qa2Ws3eD');
