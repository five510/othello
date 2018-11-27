DROP TABLE IF EXISTS othello_db.othelloHistory;
CREATE TABLE IF NOT EXISTS othello_db.othelloHistory (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstUserId INT,
    passiveUserId INT,
    winUserId INT 
);


