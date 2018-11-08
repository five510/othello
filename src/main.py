#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import logging
import bottle
import urllib.parse
from bottle import route, run, view, static_file, run, hook
from bottle import request, response, debug
from bottle import HTTPResponse
from app.controllers import *
debug(True)

logger = logging.getLogger(__name__)

def get_current_dir():
    ''' このファイルが存在するディレクトリパスを返します '''
    return os.path.dirname(os.path.abspath(__file__)) 

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'

@route('/css/<filename>')
def css_static(filename):
    ''' CSSファイルへの静的ルーティングを行います '''
    css_root = os.path.join(get_current_dir(), 'view/css')
    return static_file(filename, root=css_root)


@route('/js/<filename>')
def js_static(filename):
    ''' JSファイルへの静的ルーティングを行います '''
    js_root = os.path.join(get_current_dir(), 'view/js')
    return static_file(filename, root=js_root)


@route('/lib/<filename>')
def font_static(filename):
    ''' CSSファイルへの静的ルーティングを行います '''
    font_root = os.path.join(get_current_dir(), 'view/lib')
    return static_file(filename, root=font_root)


@route('/html/<filename>')
def html_static(filename):
    ''' HTMLファイルへの静的ルーティングを行います '''
    html_root = os.path.join(get_current_dir(), 'view/html')
    return static_file(filename, root=html_root)


if __name__ == '__main__':
    run(host='0.0.0.0', port=8080, debug=True, reload=True)
