#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import bottle
import urllib.parse
from bottle import route, run, view, static_file,hook
from bottle import request, response, debug
from bottle import HTTPResponse

import app.models.processes.othello_intelligence as othello_intelligence
othello_intelligence_model = othello_intelligence.Othello_intelligence()
@route('/api/othello-intelligence-v1',method='POST')
def othello_intelligence_v1():
    #print('request.json',request.json)
    current_othello_board = request.json.get('current_othello_board')
    current_turn = request.json.get('current_turn')
    #TODO validationをかけるようにする
    result = othello_intelligence_model.move(current_othello_board,current_turn)
    return result