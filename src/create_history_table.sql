DROP TABLE IF EXISTS othelloHistory;
CREATE TABLE IF NOT EXISTS othelloHistory (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstUserId INT,
    passiveUserId INT,
    winUserId INT 
);


