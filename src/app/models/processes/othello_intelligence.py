import app.models.processes.othello as othello
import copy
class Othello_intelligence:
    '''
    Othello intelligence class provide next better move
    '''
    N = 15  # 奇数に設定
    scoring = [
        [100, -10 , 30, 0, 0, 30, -10, 100],
        [-10, -10, 2, 5, 5, 2, -10, -10], 
        [30, 2  , 15, 10, 10, 15, 2, -5], 
        [0  , 5  , 10, 10, 10, 10, 5, 0], 
        [0  , 5  , 10, 10, 10, 10, 5, 0], 
        [30 , 2  , 15, 10, 10,  15,2, -5], 
        [-10, -10, 2, 5, 5, 2, -10, -10], 
        [100, -10 , 30, 0, 0, 30, -10, 10]
    ]
    def __init__(self):
        self.othello_model = othello.Othello()
        self.current_othello_board = []
        self.current_turn = 0
    
    def move(self,current_othello_board,current_turn):
        x,y = self.intelligence_v1(current_othello_board,current_turn)
        print('x and y',x,y)
        next_move = {
            'x': x,
            'y': y
        }
        return next_move
        #result = self.othello_model.move(current_othello_board,next_move,current_turn)
        #return result

    def not_intelligence(self,current_board):
        '''
        配列のはじめに発見した 置けるマスを返します
        '''
        for x in range(len(current_board)):
            for y in range(len(current_board[x])):
                if current_board[x][y] == 9:
                    return x,y
    
    def intelligence_v1(self,current_board,current_turn):
        max_eva = {
            'move': {
                'x':0,
                'y':0
            },
            'eva_score':-999
        }
        for x in range(len(current_board)):
            for y in range(len(current_board)):
                if current_board[x][y] == 9:
                    next_move = {
                        'x': x,
                        'y': y
                    }
                    #print('Start Evaluate ({},{})'.format(next_move['x'],next_move['y']))
                    move_result = self.othello_model.move(copy.deepcopy(current_board),next_move,copy.deepcopy(current_turn))
                    if move_result['isFinished']:
                        return next_move['x'],next_move['y']
                    evaluate_score = self.evaluate(move_result) + self.scoring[x][y]
                    #print('Evaluate value is {}'.format(evaluate_score))
                    if evaluate_score > max_eva['eva_score']:
                        max_eva = {
                            'move': next_move,
                            'eva_score':evaluate_score
                        }
        print('max_eva is {}'.format(max_eva['eva_score']))    
        return max_eva['move']['x'],max_eva['move']['y']
    
    def evaluate(self,previous_move,count=0):
        '''
        一つの可能な手の評価をします
        '''

        all_possible_boards,moves = self.all_possible_boards(copy.deepcopy(previous_move['nextOthelloBoard']),copy.deepcopy(previous_move['nextTurn']))
        #min_possible = self.get_min_possibles(all_possible_boards)
        max_eva = self.get_good_evaluate(all_possible_boards,moves,previous_move)
        '''
        self.print_b(min_possible['nextOthelloBoard'])
        print('Player {} possible moves is {}'.format(move_result['nextTurn'],move_result['possibleMoves']))
        print('Player {} possible moves is {}'.format(min_possible['nextTurn'],min_possible['possibleMoves']))
        print('-----------------------------')
        '''
        if self.N > count and not max_eva['possible_move']['isFinished']:
            count = count + 1
            return self.evaluate(max_eva['possible_move'],count)
        else:
            return max_eva['eva_score']
        

    def get_max_possibles(self,all_possible_boards):
        max_possible = 0
        max = 0
        for possible in all_possible_boards:
            if max < possible['possibleMoves']:
                max = possible['possibleMoves']
                max_possible = possible
        return max_possible
    
    def get_min_possibles(self,all_possible_boards):
        min_possible = 0
        min = 999
        for possible in all_possible_boards:
            if min > possible['possibleMoves']:
                min = possible['possibleMoves']
                min_possible = possible
        return min_possible
    
    def get_good_evaluate(self,all_possible_boards,moves,previous_move):
        max_eva = {
            'possible_move': None,
            'eva_score':-999999
        }
        for possible in all_possible_boards:
            for move in moves:
                if self.current_turn == possible['nextTurn']:
                    eva_score = possible['possibleMoves'] - previous_move['possibleMoves'] + self.scoring[move['x']][move['y']]
                else:
                    eva_score = previous_move['possibleMoves'] - possible['possibleMoves'] + self.scoring[move['x']][move['y']] 
                
                if self.is_contain_get_corner(possible):
                    eva_score = eva_score - 1000

                if max_eva['eva_score'] < eva_score:
                    max_eva['possible_move'] = possible
                    max_eva['eva_score'] = eva_score
        return max_eva
    
    def is_contain_get_corner(self,possible):
        return possible['nextOthelloBoard'][0][0] == 9 or possible['nextOthelloBoard'][0][7] == 9 or possible['nextOthelloBoard'][7][0] == 9 or possible['nextOthelloBoard'][7][7] == 9

    def all_possible_boards(self,othello_board,current_turn,isprint=False):
        all_possible_boards =[]
        moves = []
        for x in range(len(othello_board)):
            for y in range(len(othello_board[x])):
                if othello_board[x][y] == 9:
                    next_move = {
                        'x': x,
                        'y': y
                    }
                    if isprint:
                        print('Current Player:{} Move x:{} y:{}'.format(current_turn,next_move['x'],next_move['y']))
                    all_possible_boards.append(self.othello_model.move(copy.deepcopy(othello_board),next_move,copy.deepcopy(current_turn)))
                    moves.append(next_move)
        return all_possible_boards,moves
    
    def print_b(self,b):
        for e in b:
            print(e)

'''
全部の手が相手の最も置ける数が少ない手を置きます
評価 = 自分の置ける手 - 相手の置ける手
'''