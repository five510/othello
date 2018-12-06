import app.models.services.db as db
import app.models.processes.othello as othello
import app.models.processes.user as user
import app.models.processes.othello_intelligence as othello_intelligence
import urllib.request
import json

class Dispather:

    def __init__(self):
        self.user_model = user.User()
        self.othello_model = othello.Othello()
        self.othello_intelligence_model = othello_intelligence.Othello_intelligence()
    
    def othello(self,user_id,current_othello_board,current_turn):
        #TODO useridが存在しない場合のエラーハンドリング
        user = self.user_model.user_describe_by_id(user_id)
        if user['ipaddress'] == 'localhost':
            move = self.othello_intelligence_model.move(current_othello_board,current_turn)
        else:
            url = self.user_model.get_url(user)
            move = self.get_move_http(url,current_othello_board,current_turn)    
        return self.othello_model.move(current_othello_board,move,current_turn)

    def get_move_http(self,url,current_othello_board,current_turn):
        request_data = {
            'current_othello_board': current_othello_board,
            'current_turn': current_turn
        }
        headers = {
            'Content-Type': 'application/json',
        }
        req = urllib.request.Request(url, json.dumps(request_data).encode(), headers)
        print('Http request to {}.....'.format(url))
        with urllib.request.urlopen(req) as res:
            next_move = json.loads(res.read())
            print(next_move)
        print('[Finished!!] Http request to {}'.format(url))
        return next_move



