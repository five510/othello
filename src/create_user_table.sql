DROP TABLE IF EXISTS othelloUser;
CREATE TABLE IF NOT EXISTS othelloUser (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255),
    mail varchar(255),
    ipaddress varchar(16),
    port varchar(16),
    urlpath varchar(255)
);

INSERT INTO othelloUser(
    username , 
    mail, 
    ipaddress, 
    port,
    urlpath
) 
VALUES (
    'ME', 
    'me@com', 
    'localhost', 
    '8080', 
    '/api/othello-intelligence-v1'
);