import app.models.processes.othello_intelligence as intelligence
import copy

def print_b(b):
    for e in b:
        print(e)

def get(current_board,current_player):
    print_b(current_board)
    Othello_intelligence_model = intelligence.Othello_intelligence()
    print_b(Othello_intelligence_model.move(current_board,current_player)['nextOthelloBoard'])

def main():
    current_board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 9, 0, 0, 0], 
        [0, 0, 0, 1, 2, 9, 0, 0], 
        [0, 0, 9, 2, 1, 0, 0, 0], 
        [0, 0, 0, 9, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]
    current_player = 1
    Othello_intelligence_model = intelligence.Othello_intelligence()
    Othello_intelligence_model.entry_point(current_board,current_player)
    #get(copy.deepcopy(current_board),current_player)
    #get(copy.deepcopy(current_board),current_player)
    #print_b(Othello_intelligence_model.move(current_board,current_player)['nextOthelloBoard'])
    '''
    print_b(current_board)
    result = Othello_intelligence_model.all_possible_boards(current_board,current_player,True)
    for b in result:
        print('Estimate player {}'.format(b['nextTurn']))
        print_b(b['nextOthelloBoard'])
        tree = Othello_intelligence_model.all_possible_boards(b['nextOthelloBoard'],b['nextTurn'],True)
        max_possible = Othello_intelligence_model.get_max_possibles(tree)
        print('Player {}  Max Possible is {}'.format(max_possible['nextTurn'],max_possible['possibleMoves']))
        print('-----------------------------')
    '''
main()



