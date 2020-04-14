CREATE TABLE IF NOT EXISTS mst_source_code(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    source_code TEXT,
    code_name VARCHAR(255),
    save_at datetime
);
ALTER TABLE mst_source_code ADD INDEX mst_source_code_save_at(save_at);
INSERT INTO mst_source_code (source_code,code_name,save_at) values ("\nimport json\nfrom othello_rule import Othello\nclass Othello_intelligence:\n    def __init__(self,current_othello_board,current_turn):\n        self.othello_model = Othello()\n        self.current_othello_board = current_othello_board\n        self.current_turn = current_turn\n    def run(self):\n        x,y = self.not_intelligence()\n        print(str(x)+' '+str(y)) #return self.othello_model.move(self.current_othello_board,next_move,self.current_turn)\n    def not_intelligence(self):\n        for x in range(len(self.current_othello_board)):\n            for y in range(len(self.current_othello_board[x])):\n                if self.current_othello_board[x][y] == 9:\n                    return x,y\nif  __name__ == '__main__':\n    input_json = json.loads(input())\n    Othello_intelligence(\n        input_json['current_othello_board'],\n        input_json['current_turn']\n    ).run()\n",'test2','2020-03-21 00:00:00');

CREATE TABLE IF NOT EXISTS trn_battle_result(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    start_at datetime,
    end_at datetime,
    souce_code_id_1 INT,
    souce_code_id_2 INT,
    win_source_code_id INT DEFAULT 0,
    win_reason INT DEFAULT 0
);
ALTER TABLE trn_battle_result ADD INDEX trn_battle_result_start_at(start_at);

CREATE TABLE IF NOT EXISTS trn_battle_snapshot(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    save_at datetime,
    result_id INT,
    current_code_id INT,
    current_board json
);
ALTER TABLE trn_battle_snapshot ADD INDEX trn_battle_snapshot_result_save_at(result_id,save_at);
