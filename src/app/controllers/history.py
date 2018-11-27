#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import bottle
import urllib.parse
from bottle import route, run, view, static_file,hook
from bottle import request, response, debug
from bottle import HTTPResponse

import app.models.processes.history as history
history_model = history.History()

@route('/api/history/create',method='POST')
def history_create():
    print('request.json',request.json)
    first_user_id = request.json.get('first_user_id')
    passive_user_id = request.json.get('passive_user_id')
    win_user_id = request.json.get('win_user_id') 
    #TODO validationをかけるようにする
    result = history_model.user_create(first_user_id,passive_user_id,win_user_id)
    return result
