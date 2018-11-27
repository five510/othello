#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import bottle
import urllib.parse
from bottle import route, run, view, static_file,hook
from bottle import request, response, debug
from bottle import HTTPResponse

import app.models.processes.othello as othello
othello_model = othello.Othello()

@route('/api/othello-move',method='POST')
def othello_move():
    print('request.json',request.json)
    current_othello_board = request.json.get('current_othello_board')
    next_move = request.json.get('next_move')
    current_turn = request.json.get('current_turn') 
    #TODO validationをかけるようにする
    result = othello_model.move(current_othello_board,next_move,current_turn)
    return result

@route('/api/othello-init',method='POST')
def get_init_board():
    print('request.json',request.json)
    first_turn = int(request.json.get('first_turn')) 
    #TODO validationをかけるようにする
    result = othello_model.get_init_board(first_turn)
    return result