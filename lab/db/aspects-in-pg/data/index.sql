-- Initial data ----------------------------------------------------------------
INSERT INTO system.entity VALUES('user-origo', 'user-origo');
INSERT INTO security.user VALUES('user-origo', 'origo');

INSERT INTO system.entity VALUES('password-origo', 'user-origo');
INSERT INTO system.link VALUES('password-origo', 'user-origo');
INSERT INTO security.password VALUES ('password-origo', '!qa2Ws3eD');
