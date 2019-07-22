import urllib.request
import json
'''
user_model = user.User()
user_model.user_create(
    'kato',
    'kato@worksap.co.jp',
    '8.8.8.8',
    '443',
    '/api/path'
)

print(user_model.user_describe())
'''
current_board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 9, 0, 0, 0], 
        [0, 0, 0, 1, 2, 9, 0, 0], 
        [0, 0, 9, 2, 1, 0, 0, 0], 
        [0, 0, 0, 9, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]
current_player = 1
url = 'http://127.0.0.1:8080/api/othello-intelligence-v1'
request_data = {
    'current_othello_board': current_board,
    'current_turn': current_player
}
headers = {
    'Content-Type': 'application/json',
}
req = urllib.request.Request(url, json.dumps(request_data).encode(), headers)
with urllib.request.urlopen(req) as res:
    othello_result_body = res.read()
print(othello_result_body)