import logging
from api.othello import othello_api
from api.soucecode import soucecode_api
from flask import Flask
app = Flask(__name__)

app.register_blueprint(othello_api)
app.register_blueprint(soucecode_api)
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')