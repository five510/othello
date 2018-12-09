#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import bottle
import urllib.parse
from bottle import route, run, view, static_file,hook
from bottle import request, response, debug
from bottle import HTTPResponse

import app.models.processes.dispather as dispather
dispather_model = dispather.Dispather()

@route('/api/dispather/othello',method='POST')
def history_create():
    #print('request.json',request.json)
    user_id = int(request.json.get('user_id'))
    current_othello_board = request.json.get('current_othello_board')
    current_turn = request.json.get('current_turn')
    #TODO validationをかけるようにする
    return dispather_model.othello(user_id,current_othello_board,current_turn)