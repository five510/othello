#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import bottle
import urllib.parse
from bottle import route, run, view, static_file,hook
from bottle import request, response, debug
from bottle import HTTPResponse

import app.models.processes.user as user
user_model = user.User()

@route('/api/user/create',method='POST')
def user_create():
    print('request.json',request.json)
    username = request.json.get('username')
    mail = request.json.get('mail')
    ipaddress = request.json.get('ipaddress')
    port = request.json.get('port')
    urlpath = request.json.get('urlpath')
    return user_model.user_create(username, mail, ipaddress, port, urlpath)

@route('/api/user/describe',method='POST')
def user_describe():
    return user_model.user_describe()

@route('/api/user/delete',method='POST')
def user_delete():
    pass