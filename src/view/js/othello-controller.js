Board = function(firstPlayer){
  this.board = []
  this.player = firstPlayer
}

function init(board,view,api){
  let firstRequest = {
    'first_turn': board.player
  }
  api.getInitBoard(firstRequest).then(function(result){
    let initBoard = result
    board.board = initBoard['nextOthelloBoard']
    board.player = initBoard['nextTurn']
    view.reflectViewothelloField(board.board)
    view.changeScore(board.board)
    view.reflectGameTurn(board.player)
  })
}


function bindEvent(board,view,api){
  //Hard coding
  $('.othelloRow td').click(function(){
    let x = $(this).attr('x')
    let y = $(this).attr('y')
    let requestData = {
      'current_turn': board.player,
      'current_othello_board': board.board,
      'next_move': {
        'x': x,
        'y': y
      }
    }
    api.moveBoard(requestData)
      .then(function(result){
        if(result['validation']['isValid']){
          let boardInfo = result
          board.board = boardInfo['nextOthelloBoard']
          board.player = boardInfo['nextTurn']
          view.reflectViewothelloField(board.board)
          view.changeScore(board.board)
          view.reflectGameTurn(board.player)
        } else{
          alert(result['validation']['text'])
        }
      })
      .then(function(){
        let requestData = {
          'current_turn': board.player,
          'current_othello_board': board.board,
        }
        api.moveIntelligenceV1(requestData).then(function(result){
          if(result['validation']['isValid']){
            let boardInfo = result
            board.board = boardInfo['nextOthelloBoard']
            board.player = boardInfo['nextTurn']
            view.reflectViewothelloField(board.board)
            view.changeScore(board.board)
            view.reflectGameTurn(board.player)
          } else{
            alert(result['validation']['text'])
          }
        })
      })
  })
}

//Entrypoint
function main(){
  let firstPlayer = 1
  let otheloNum = 8
  let $el = $('.otheloBody')
  let myBoard = new Board(firstPlayer)
  let myView = new othelloView($el,otheloNum)
  let api = new apiClient()
  init(myBoard,myView,api)
  bindEvent(myBoard,myView,api)
}

main()

