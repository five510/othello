import json
from othello_rule import Othello
class Othello_intelligence:
    def __init__(self,current_othello_board,current_turn):
        self.othello_model = Othello()
        self.current_othello_board = current_othello_board
        self.current_turn = current_turn
    def run(self):
        x,y = self.not_intelligence()
        print(str(x)+' '+str(y)) #return self.othello_model.move(self.current_othello_board,next_move,self.current_turn)
    def not_intelligence(self):
        for x in range(len(self.current_othello_board)):
            for y in range(len(self.current_othello_board[x])):
                if self.current_othello_board[x][y] == 9:
                    return x,y
if  __name__ == '__main__':
    a = input()
    print(a)
    input_json = json.loads(a)
    Othello_intelligence(
        input_json['current_othello_board'],
        input_json['current_turn']
    ).run()