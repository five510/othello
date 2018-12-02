import app.models.processes.othello as othello

class Othello_intelligence:
    '''
    Othello intelligence class provide next better move
    '''
    def __init__(self):
        self.othello_model = othello.Othello()
        self.current_othello_board = []
        self.current_turn = 0
    
    def move(self,current_othello_board,current_turn):
        self.current_othello_board = current_othello_board
        self.current_turn = current_turn
        print(self.current_othello_board)
        x,y = self.not_intelligence()
        print('x and y',x,y)
        next_move = {
            'x': x,
            'y': y
        }
        return next_move
        #return self.othello_model.move(self.current_othello_board,next_move,self.current_turn)

    def not_intelligence(self):
        for x in range(len(self.current_othello_board)):
            for y in range(len(self.current_othello_board[x])):
                if self.current_othello_board[x][y] == 9:
                    return x,y
