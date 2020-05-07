import logging
import requests
import json
from utils import db
from utils import utils
from flask import Blueprint,request, abort
from othello_rule import Othello
from service.sandbox import PythonSandbox

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

soucecode_api = Blueprint('soucecode_api', __name__)

def verify_sourcecode(souce_code) -> bool:
    '''
    Not happen runtime error
    Follow othello rules 
    '''
    othello_model = Othello()
    othello_board = othello_model.get_init_board(1)
    sandbox = PythonSandbox()
    logger.debug(othello_board)
    input_json = {
        "current_turn": othello_board['nextTurn'],
        "current_othello_board": othello_board['nextOthelloBoard']
    }
    result = sandbox.run(souce_code,json.dumps(input_json))
    return result['exit_code'] == 0

@soucecode_api.route('/api/soucecode',methods=['POST'])
def add_sourcecode():
    name = request.json.get('name')
    souce_code = request.json.get('souce_code')
    is_verify = verify_sourcecode(souce_code)
    if not is_verify:
        abort(400)
    souce_code_id = db.insert_mst_source_code(souce_code,name)
    return utils.json_dumps(souce_code_id)

@soucecode_api.route('/api/soucecode/verify',methods=['POST'])
def post_verify_sourcecode():
    souce_code = request.json.get('souce_code')
    is_verify = verify_sourcecode(souce_code)
    return utils.json_dumps(is_verify)

@soucecode_api.route('/api/soucecode/all',methods=['GET'])
def get_all_sourcecode():
    trn_source_id_name_list  = db.select_id_name_mst_source_code()
    return utils.json_dumps(trn_source_id_name_list)

@soucecode_api.route('/api/soucecode/<source_code_id>/detail',methods=['GET'])
def get_detail_sourcecode(source_code_id=None):
    mst_source_code  = db.select_mst_source_code_by_id(source_code_id)
    return utils.json_dumps(mst_source_code)
    