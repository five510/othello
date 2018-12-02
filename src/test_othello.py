import unittest
import app.models.processes.othello as othello


class othelloNomalCase(unittest.TestCase):
    """test class of nomal cases
    """
    def test_othello(self):
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
        next_moves = {
            'x': 2,
            'y': 4
        }
        current_player = 1
        expected =  {
            'nextOthelloBoard': [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 9, 1, 9, 0, 0], 
                [0, 0, 0, 1, 1, 0, 0, 0], 
                [0, 0, 0, 2, 1, 9, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            'nextTurn': 2,
            'validation': {
                'isValid': True,
                'text': ''
            },
            'isSkipped': False,
            'isFinished': False,
            'white': 4, 
            'black': 1, 
            'possibleMoves': 3
        }
        othello_model = othello.Othello()
        actual = othello_model.move(current_board,next_moves,current_player)
        self.assertEqual(expected, actual)
        

class othelloNotInPossibleMovesCase(unittest.TestCase):
    """test class of moves doesn't exists in possible moves.
    """
    def test_othello(self):
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
        next_moves = {
            'x': 2,
            'y': 6
        }
        current_player = 1
        expected =  {
            'nextOthelloBoard': [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 9, 0, 0, 0], 
                [0, 0, 0, 1, 2, 9, 0, 0], 
                [0, 0, 9, 2, 1, 0, 0, 0], 
                [0, 0, 0, 9, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            'nextTurn': 1,
            'validation': {
                'isValid': False,
                'text': 'next_move is not included possible moves. Please input correct cells'
            },
            'isSkipped': False,
            'isFinished': False,
            'white': 2, 
            'black': 2, 
            'possibleMoves': 4
        }
        othello_model = othello.Othello()
        actual = othello_model.move(current_board,next_moves,current_player)
        self.assertEqual(expected, actual)

class othelloSkipNextMoveCase(unittest.TestCase):
    """test class of next moves will be skipped but game will continue.
    """
    def test_othello(self):
        current_board = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1], 
                [2, 1, 1, 1, 1, 1, 1, 2],
                [9, 0, 0, 0, 0, 0, 0, 9], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]
            ]
        next_moves = {
            'x': 5,
            'y': 0
        }
        current_player = 1
        expected =  {
            'nextOthelloBoard': [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1], 
                [1, 1, 1, 1, 1, 1, 1, 2],
                [1, 0, 0, 0, 0, 0, 0, 9], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            'nextTurn': 1,
            'validation': {
                'isValid': True,
                'text': ''
            },
            'isSkipped': True,
            'isFinished': False,
            'white': 40, 
            'black': 1, 
            'possibleMoves': 1
        }
        othello_model = othello.Othello()
        actual = othello_model.move(current_board,next_moves,current_player)
        self.assertEqual(expected, actual)

class othelloFinishGameCase(unittest.TestCase):
    """test class of game finish
    """
    def test_othello(self):
        current_board = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1], 
                [1, 1, 1, 1, 1, 1, 1, 2],
                [1, 0, 0, 0, 0, 0, 0, 9], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]
            ]
        next_moves = {
            'x': 5,
            'y': 7
        }
        current_player = 1
        expected =  {
            'nextOthelloBoard': [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1], 
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            'nextTurn': 1,
            'validation': {
                'isValid': True,
                'text': ''
            },
            'isSkipped': True,
            'isFinished': True,
            'white': 42, 
            'black': 0, 
            'possibleMoves': 0
        }
        othello_model = othello.Othello()
        actual = othello_model.move(current_board,next_moves,current_player)
        self.assertEqual(expected, actual)
if __name__ == "__main__":
    unittest.main()

'''
[[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 9, 1, 9, 0, 0], 
[0, 0, 0, 1, 1, 0, 0, 0], 
[0, 0, 0, 2, 1, 9, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0]
]

[[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 9, 1, 2, 0, 0, 0], 
[0, 0, 1, 1, 1, 0, 0, 0], 
[0, 0, 9, 0, 9, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0]]
'''