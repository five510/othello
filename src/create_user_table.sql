DROP TABLE IF EXISTS othello_db.othelloUser;
CREATE TABLE IF NOT EXISTS othello_db.othelloUser (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255),
    mail varchar(255),
    ipaddress varchar(16),
    port varchar(16),
    urlpath varchar(255)
);
