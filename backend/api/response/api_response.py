from dataclasses import dataclass

@dataclass
class OthelloResponse():
    nextOthelloBoard: list
    nextTurn: int
    validation: dict
    isSkipped: bool
    isFinished: bool
    white: int
    black: int
    possibleMoves: int