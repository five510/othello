Board = function(){
  this.board = []
  this.player = 0
}

othelloDispatcher = function(){
  this.initUrl = '/api/othello-init'
  this.moveUrl = '/api/othello-move'
}

othelloDispatcher.prototype.getInitBoard = function(requestData){
  $.ajax({
    url: "/api/othello-init",
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    async: false,
    data: JSON.stringify(requestData)
    /*
    JSON.stringify({
      'cell_num': 8,
      'first_turn': 1
    })
    */
  }).done(function(result){
    let initBoard = result
    myBoard.board = initBoard['nextOthelloBoard']
    myBoard.player = initBoard['nextTurn']
    myView.reflectViewothelloField(myBoard.board)
    //myView.reflectNext(myOthelo.possibleMoves)
    myView.changeScore(myBoard.board)
    myView.reflectGameTurn(myBoard.player)
  }).fail(function(result) {
    console.log('[ERROR] /api/othello-init is failed')
    console.log(result)
  });
}
  
othelloDispatcher.prototype.move = function(requestData){
  $.ajax({
    url: "/api/othello-move",
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(requestData)
    /*
    JSON.stringify({
    'current_othello_board': [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0,9, 0, 0, 0], [0, 0, 0, 1, 2, 9, 0, 0], [0, 0, 9, 2, 1, 0, 0, 0], [0, 0, 0, 9,0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    'next_move': {
      'row_num': 2,
      'column_num': 4
    },
    'current_turn': 1
  })
    */
  }).done(function(result) {
    if(result['validation']['isValid']){
      let boardInfo = result
      myBoard.board = boardInfo['nextOthelloBoard']
      myBoard.player = boardInfo['nextTurn']
      myView.reflectViewothelloField(myBoard.board)
      //myView.reflectNext(myOthelo.possibleMoves)
      myView.changeScore(myBoard.board)
      myView.reflectGameTurn(myBoard.player)

      let requestData = {
        'current_turn': myBoard.player,
        'current_othello_board': myBoard.board,
      }
      othelloDispacher.moveIntelligenceV1(requestData)
    } else{
      alert(result['validation']['text'])
    }
    
  }).fail(function(result) {
    console.log('[ERROR] /api/othello-move is failed')
    console.log(result)
  });
}

othelloDispatcher.prototype.moveIntelligenceV1 = function(requestData){
  $.ajax({
    url: "/api/othello-intelligence-v1",
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(requestData)
    /*
    JSON.stringify({
    'current_othello_board': [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0,9, 0, 0, 0], [0, 0, 0, 1, 2, 9, 0, 0], [0, 0, 9, 2, 1, 0, 0, 0], [0, 0, 0, 9,0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    'next_move': {
      'row_num': 2,
      'column_num': 4
    },
    'current_turn': 1
  })
    */
  }).done(function(result) {
    if(result['validation']['isValid']){
      let boardInfo = result
      myBoard.board = boardInfo['nextOthelloBoard']
      myBoard.player = boardInfo['nextTurn']
      myView.reflectViewothelloField(myBoard.board)
      //myView.reflectNext(myOthelo.possibleMoves)
      myView.changeScore(myBoard.board)
      myView.reflectGameTurn(myBoard.player)
    } else{
      alert(result['validation']['text'])
    }
    
  }).fail(function(result) {
    console.log('[ERROR] /api/othello-move is failed')
    console.log(result)
  });
}



//Entrypoint
function main(){
  let firstPlayer = 1
  let otheloNum = 8
  let firstRequest = {
    'first_turn': firstPlayer
  }
  let $el = $('.otheloBody')
  myBoard = new Board()
  myView = new othelloView($el,otheloNum)
  othelloDispacher = new othelloDispatcher()
  othelloDispacher.getInitBoard(firstRequest)
  //Hard coding
  $('.othelloRow td').click(function(){
    let x = $(this).attr('x')
    let y = $(this).attr('y')
    let requestData = {
      'current_turn': myBoard.player,
      'current_othello_board': myBoard.board,
      'next_move': {
        'x': x,
        'y': y
      }
    }
    othelloDispacher.move(requestData)
    
  })
}
main()

