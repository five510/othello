import logging
import requests
from flask import Blueprint,request, abort
from othello_rule import Othello

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