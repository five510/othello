
def print_info(info_str):
    print('[info] {0}'.format(info_str))

class Othello:
    '''
    Othello class manages othello rules
    '''
    def __init__(self):
        self.cell_num = 8
        self.othello_borad = []
        self.player_turn = 0 #1 is white 2 is black

    def get_init_board(self,first_turn):
        '''初めのみ呼ばれる関数です'''
        #TODO first_turnが1,2である事のvalidを入れる
        self._set_player_turn(first_turn)
        self._init_board()
        validation_result = {
            'isValid': True,
            'text': ''
        }
        is_skipped = False
        is_finished = False
        return self._get_output(validation_result,is_skipped,is_finished)

    def move(self,current_othello_board,next_move,current_turn):
        self._set_player_turn(current_turn)
        self._set_boad(current_othello_board)
        parsed_next_moved = self._parse_int_next_move(next_move)
        validation_result = {
            'isValid': True,
            'text': ''
        }
        is_skipped = False
        is_finished = False
        if self._validate_in_possible_move(parsed_next_moved):
            '''入力がpossible moveの中にある場合'''
            self._reflect_move(parsed_next_moved)
            if self._is_exist_possible_moves():
                '''possible moveがある場合はそのままreturn/ない場合はplayerの変更を行う '''
            else:
                self._change_player()
                is_skipped = True
                if self._is_exist_possible_moves():
                    '''possible moveがある場合はそのままreturn/ない場合はどちらのplayerも置けない状況なのでgame終了のflagを入れる '''
                else:
                    is_finished = True
        else:
            validation_result['isValid'] = False
            validation_result['text'] = 'next_move is not included possible moves. Please input correct cells'
        
        return self._get_output(validation_result,is_skipped,is_finished)
    
    def _get_output(self,validation_result,is_skipped,is_finished):
        white_count,black_count,possible_moves = self._get_board_summary()
        return {
            'nextOthelloBoard': self.othello_borad,
            'nextTurn': self.player_turn,
            'validation': validation_result,
            'isSkipped': is_skipped,
            'isFinished': is_finished,
            'white': white_count,
            'black': black_count,
            'possibleMoves': possible_moves
        }
    
    def _is_exist_possible_moves(self):
        for x in range(len(self.othello_borad)):
            for y in range(len(self.othello_borad[x])):
                if self.othello_borad[x][y] == 9:
                    return True
        return False

    def _get_board_summary(self):
        white_count = 0
        black_count = 0
        possible_moves = 0
        for x in range(len(self.othello_borad)):
            for y in range(len(self.othello_borad[x])):
                if self.othello_borad[x][y] == 9:
                    possible_moves = possible_moves + 1
                elif self.othello_borad[x][y] == 2:
                    black_count = black_count + 1
                elif self.othello_borad[x][y] == 1:
                    white_count = white_count + 1
        return white_count,black_count,possible_moves

    def _validate_in_possible_move(self,parsed_next_moved):
        return self.othello_borad[parsed_next_moved['x']][parsed_next_moved['y']] == 9
    
    def _parse_int_next_move(self,next_move):
        return {
            'x': int(next_move['x']),
            'y': int(next_move['y'])
        }
    def _change_player(self):
        if self.player_turn == 1:
            self.player_turn = 2
        else:
            self.player_turn = 1
        self._set_possible_moves()

    def _set_boad(self,current_othello_board):
        self.othello_borad = current_othello_board

    def _set_player_turn(self,player_turn):
        self.player_turn = player_turn

    def _init_board(self):
        self.othello_borad = [[0 for i in range(self.cell_num)] for j in range(self.cell_num)]
        center1 = int(self.cell_num / 2)
        center2 = int(center1 - 1)
        print_info('center1:{} center2:{}'.format(center1,center2))
        self.othello_borad[center1][center1] = 1
        self.othello_borad[center1][center2] = 2
        self.othello_borad[center2][center1] = 2
        self.othello_borad[center2][center2] = 1
        self._set_possible_moves()
        print('check board',self.othello_borad)

    def _set_possible_moves(self):
        for x in range(len(self.othello_borad)):
            for y in range(len(self.othello_borad[x])):
                #cleanup everytime
                if self.othello_borad[x][y] == 9:
                    self.othello_borad[x][y] = 0
                # check and input process    
                if self._is_possible_move(x, y):
                    self.othello_borad[x][y] = 9

    
    def _is_possible_move(self, x, y):
        
        #そのマスが埋まっていないか確認
        if self.othello_borad[x][y] == 1 or self.othello_borad[x][y] == 2:
            return False
        #周り８つのマスに有効化打があるかを取得する
        around_eight_side_turn_cells = self._get_around_eight_side_turn_cells(x, y)
        if len(around_eight_side_turn_cells) > 0:
            return True
        else:
            return False
    
    def _is_inner_cell_num(self,x,y):
        return ( x in range(self.cell_num) ) and (y in range(self.cell_num))
    
    def _get_turn_cells(self,dx,dy,x,y,turn_cells=[]):
        '''再帰的にひっくり返すことができるマスを探索して返します'''
        turn_candidate_x = x + dx
        turn_candidate_y = y + dy
        turn_cells.append({
            'turn_row': turn_candidate_x,
            'turn_column': turn_candidate_y
        })
        if self._is_inner_cell_num(turn_candidate_x,turn_candidate_y) == False:
            #range(othelloNum)の範囲を超えている場合は空のリストを返す
            return []
        elif self.othello_borad[turn_candidate_x][turn_candidate_y] == 0:
            #該当のマスが何も埋まっていない場合は空のリストを返す
            return []
        elif self.othello_borad[turn_candidate_x][turn_candidate_y] == 9:
            #該当のマスがからの場合は空のリストを返す
            return []
        elif self.othello_borad[turn_candidate_x][turn_candidate_y] == self.player_turn:
            #該当のマスが自分のマスの場合
            if len(turn_cells) == 1:
                #初めての処理の場合のみ空のリストを返す
                return []
            else:
                #それ以外の場合は返すことができるマスのリストを返す
                return turn_cells
        elif self.othello_borad[turn_candidate_x][turn_candidate_y] != self.player_turn:
            #相手のコマが見つかった場合は,再度探索する
            return self._get_turn_cells(dx,dy,turn_candidate_x,turn_candidate_y,turn_cells)

    def _get_around_eight_side_turn_cells(self, x, y):
        around_eight_side_turn_cells = []
        for dx in [-1,0,1]:
            for dy in [-1,0,1]:
                turn_cells = self._get_turn_cells(dx,dy,x,y,[])
                for turn_cell in turn_cells:
                    around_eight_side_turn_cells.append(turn_cell)
        return around_eight_side_turn_cells
    
    def _reflect_move(self,parsed_next_moved):
        # next_move itself
        self.othello_borad[parsed_next_moved['x']][parsed_next_moved['y']] = self.player_turn
        # turn around cells
        around_eight_side_turn_cells = self._get_around_eight_side_turn_cells(parsed_next_moved['x'],parsed_next_moved['y'])
        for turn_cell in around_eight_side_turn_cells:
            self.othello_borad[turn_cell['turn_row']][turn_cell['turn_column']] = self.player_turn
        self._change_player()

'''
othello = Othello()
res = othello.get_init_board(8,1)
next_move = {
    'x': 1,
    'y': 1
}
print(res) 
print(othello.move(res['nextOthelloBoard'],next_move,1))
next_move = {
    'x': 2,
    'y': 4
}
print(othello.move(res['nextOthelloBoard'],next_move,1))
'''