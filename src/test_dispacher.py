import unittest
import urllib.request
import json


class dispatcherLocalCase(unittest.TestCase):
    """test class of dispatch to localhost
    validation: True -> check move included correct ohtello rule
    status code 200 -> check over timeout 
    """
    def test_dispatch(self):
        
        user_id = 1
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
        url = 'http://localhost:8080/api/dispather/othello'
        request_data = {
            'user_id': user_id,
            'current_othello_board': current_board,
            'current_turn': current_player
        }
        headers = {
            'Content-Type': 'application/json',
        }

        expected = {
            'validation': {
                'isValid': True,
                'text': ''
            },
            'status_code': 200
        }

        req = urllib.request.Request(url, json.dumps(request_data).encode(), headers)
        with urllib.request.urlopen(req) as res:
            othello_result_body = res.read()
        
        actual = {
            'validation': othello_result_body['validation'],
            'status_code': 200
        }
        self.assertEqual(expected, actual)
        

if __name__ == "__main__":
    unittest.main()