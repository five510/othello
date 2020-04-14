import logging
import requests
import json
from utils import db
from utils import utils
from flask import Blueprint,request, abort
from othello_rule import Othello
from service.sandbox import PythonSandbox
from api.response.api_response import OthelloResponse

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

othello_api = Blueprint('othello_api', __name__)

@othello_api.route('/api/othello-move',methods=['POST'])
def othello_move():
    othello_model = Othello()
    current_othello_board = request.json.get('current_othello_board')
    next_move = request.json.get('next_move')
    current_turn = request.json.get('current_turn') 
    #TODO validationをかけるようにする
    result = othello_model.move(current_othello_board,next_move,current_turn)
    return result

@othello_api.route('/api/othello-init',methods=['POST'])
def get_init_board():
    othello_model = Othello()
    first_turn = int(request.json.get('first_turn')) 
    #TODO validationをかけるようにする
    result = othello_model.get_init_board(first_turn)
    return result

@othello_api.route('/api/othello/autoplay/next',methods=['POST'])
def get_next_board():
    '''
    Support manual vs CPU
    '''
    othello_model = Othello()
    sandbox = PythonSandbox()
    current_turn = int(request.json.get('current_turn'))
    current_othello_board = request.json.get('current_othello_board')
    logger.debug(current_othello_board)
    logger.debug(type(current_othello_board))
    souce_code_id = int(request.json.get('souce_code_id'))
    souce_code = db.select_mst_source_code_by_id(souce_code_id)['source_code']
    logger.debug(souce_code)
    input_json = {
        "current_turn": current_turn,
        "current_othello_board": current_othello_board
    }
    result = sandbox.run(souce_code,json.dumps(input_json))
    x,y = map(str,result['stdout'].decode('utf-8').split(' '))
    next_move = {
        'x': x,
        'y': y
    }
    othello_result = othello_model.move(current_othello_board,next_move,current_turn)
    return othello_result

@othello_api.route('/api/othello/autoplay',methods=['POST'])
def trigger_othello():
    souce_code_id_1 = int(request.json.get('souce_code_id_1'))
    souce_code_id_2 = int(request.json.get('souce_code_id_2')) 
    souce_code_1 = db.select_mst_source_code_by_id(souce_code_id_1)
    souce_code_2 = db.select_mst_source_code_by_id(souce_code_id_2)
    trn_battle_result_id = db.insert_trn_battle_result(
        souce_code_id_1,souce_code_id_2
    )
    sandbox = PythonSandbox()
    othello_model = Othello()
    othello_result = othello_model.get_init_board(1)
    while othello_result['isFinished'] == False:
        current_turn = othello_result['nextTurn']
        current_othello_board = othello_result['nextOthelloBoard']
        logger.debug(current_othello_board)
        if current_turn == 1:
            souce_code = souce_code_1['source_code']
            souce_code_id = souce_code_id_1
        elif current_turn == 2:
            souce_code = souce_code_2['source_code']
            souce_code_id = souce_code_id_2
        else:
            logger.warning('Some internal error happens')
        input_json = {
            "current_turn": current_turn,
            "current_othello_board": current_othello_board
        }
        result = sandbox.run(souce_code,json.dumps(input_json))
        x,y = map(str,result['stdout'].decode('utf-8').split(' '))
        next_move = {
            'x': x,
            'y': y
        }
        othello_result = othello_model.move(current_othello_board,next_move,current_turn)
        trn_battle_snapshot_id = db.insert_trn_battle_snapshot(
            trn_battle_result_id,souce_code_id,othello_result['nextOthelloBoard']
        )
    if othello_result['white'] > othello_result['black']:
        win_user_id = souce_code_id_1
    else:
        win_user_id = souce_code_id_2
    trn_battle_result = db.update_trn_battle_result(trn_battle_result_id,win_user_id)
    return utils.json_dumps(othello_result)