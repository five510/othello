Board = function(firstPlayer){
  this.board = []
  this.player = firstPlayer
  this.isFinish = false
}

Player = function(order,userId,name){
  this.order = order
  this.userId = userId
  this.name = name
}

Player.prototype.getPlayer = function(){
  return {
    'order': this.order,
    'userId': this.userId,
    'name': this.name
  }
}

othelloController = function(){
  this.first_player = 1
  this.otheloNum = 8
  this.board = new Board(this.first_player)
  this.view = new othelloView(this.otheloNum)
  this.api = new apiClient()
  this.players = []
  this.init()
}

othelloController.prototype.init = function(){
  let firstRequest = {
    'first_turn': this.board.player
  }
  this.api.getInitBoard(firstRequest).then( (result) =>
    this.changeBoardSituation(result)
  )
}

othelloController.prototype.setPlayers = function(userA,userB){
  this.players = [
    new Player(1,userA['userId'],userA['userName']),
    new Player(2,userB['userId'],userB['userName'])
  ]
  $(window).trigger('gameController',[null])
}

othelloController.prototype.restart = function(){
  this.board = new Board(this.first_player)
  let firstRequest = {
    'first_turn': this.board.player
  }
  this.api.getInitBoard(firstRequest).then( (result) => {
    this.changeBoardSituation(result)
    this.intelligenceActionV1()
  })
}

othelloController.prototype.changePlayerOrder = function(){
  for(let i in this.players){
    if(this.players[i].order == 1){
      this.players[i].order = 2
    } else if (this.players[i].order == 2){
      this.players[i].order = 1
    }
  }
}


othelloController.prototype.changeBoardSituation = function(apiOthelloResult){
  this.board.board = apiOthelloResult['nextOthelloBoard']
  this.board.player = apiOthelloResult['nextTurn']
  this.view.reflectViewothelloField(this.board.board)
  this.view.changeScore(this.board.board)
  this.view.reflectGameTurn(this.board.player)
}

othelloController.prototype.intelligenceActionV1 = function(){
  for(let i in this.players){
    if(this.board.player == this.players[i].order){
      userId = this.players[i].userId
    }
  }
  let requestData = {
    'current_turn': this.board.player,
    'current_othello_board': this.board.board,
    'user_id': userId
  }
  this.api.moveIntelligenceV1(requestData).then( (result) => {
    console.log(result)
    if(result['validation']['isValid']){
      this.changeBoardSituation(result)
      if(result['isFinished']){
        //alert('finished!!!!!')
        this.board.isFinish = true
        $(window).trigger('gameController',[this.getResult(result)])
      }else if(result['isSkipped']){
        console.log('Skipped')
        this.intelligenceActionV1()
      }else{
        this.intelligenceActionV1()
      }
    }else{
      alert(result['validation']['text'])
      return false
    }
  }) 
}

othelloController.prototype.personAction = function(result){
  if(result['validation']['isValid']){
    this.changeBoardSituation(result)
    if(result['isFinished']){
      alert('finished!!!!!')
      return false
    }else if(result['isSkipped']){
      alert('Skipped!!!!!')
      return false
    }else{
      return true
    }
  } else{
    alert(result['validation']['text'])
    return false
  }
}

othelloController.prototype.getRequestData = function(x,y){
  return {
    'current_turn': this.board.player,
    'current_othello_board': this.board.board,
    'next_move': {
      'x': x,
      'y': y
    }
  }
}

othelloController.prototype.getResult = function(othelloResult){
  let players = []
  for(let i in this.players){
    players.push(this.players[i].getPlayer())
  }
  return {
    'othelloResult': othelloResult,
    'first_player': this.first_player,
    'players': players
  }
}

/*
盤面の情報を受け取ってhtmlとして描画するためのclass
< class = 'otheloBody'>に対応します
*/

othelloView = function(othelloNum){
  this.$othelloBoard = $('.othelloBoard')
  this.$othelloScore = $('.othelloScore')
  this.$othelloBody
  this.othelloNum = othelloNum
  this.initothelloField()
}

othelloView.prototype.initothelloField = function(){
  this.$othelloBoard.empty()
  let $table = $('<table></table>')
  let $thead = $('<thead><tr></tr></thead>')
  let $tbody = $('<tbody></tbody>')
  $thead.append($('<th></th>'))
  for(let i = 0 ; this.othelloNum  >i ; i++){
    let othelloRow = $('<tr></tr>',{
      addClass: 'othelloRow'
    }).append(
      $(`<th>${i + 1}</th>`)
    )
    $thead.append(`<th>${i + 1}</th>`)
    for(let j = 0 ; this.othelloNum  >j ; j++){
      othelloRow.append(
        $('<td></td>',{
          x: i,
          y: j
        })
      )
    }
    $tbody.append(othelloRow)
  }
  $table.append($thead)
  $table.append($tbody)
  this.$othelloBody = $tbody
  this.$othelloBoard.append($table)
}

othelloView.prototype.reflectNext = function(possibleMoves){
  let rows = this.$othelloBody.children()
  for(let i = 0 ; rows.length >i ; i++){
    let eachCells = $(rows[i]).children()
    // when j == 0 , return th. so j start 1
    for(let j = 1 ; eachCells.length >j ; j++){
      if(possibleMoves[i][j-1].length > 0){
        $(eachCells[j]).removeClass()
        $(eachCells[j]).addClass(
          this.getColorFromNum(3)
        )
      }
    }
  }
}

othelloView.prototype.changeScore = function(othelloArry){
  this.$othelloScore.empty()
  let countWhitelayer = 0
  let countBlacklayer = 0
  for(let i = 0 ; this.othelloNum > i ; i++){
    for(let j = 0 ; this.othelloNum > j ; j++){
      if(othelloArry[i][j] == 1){
        countWhitelayer++
      }else if(othelloArry[i][j] == 2){
        countBlacklayer++
      }
    }
  }
  this.$othelloScore.append(`white:<span class="whitePlayer">${countWhitelayer}</span> - black:<span class="blackPlayer">${countBlacklayer}</span>`)
}

othelloView.prototype.reflectViewothelloField = function(othelloArry){
  let rows = this.$othelloBody.children()
  for(let i = 0 ; rows.length >i ; i++){
    let eachCells = $(rows[i]).children()
    // when j == 0 , return th. so j start 1
    for(let j = 1 ; eachCells.length+1 >j ; j++){
      $(eachCells[j]).removeClass()
      $(eachCells[j]).addClass(
        this.getColorFromNum(othelloArry[i][j-1])
      )
    }
  }
}

othelloView.prototype.getColorFromNum = function(num){
  if(num == 0){ return 'green' }
  if(num == 1){ return 'white' }
  if(num == 2){ return 'black' }
  if(num == 9){ return 'lightgreen' }
}


othelloView.prototype.reflectGameTurn = function(gameTurn){
  let currentPlayerClass = 'bold'
  if(gameTurn == 1){
    $('.whitePlayer').addClass(currentPlayerClass)
    $('.blackPlayer').removeClass(currentPlayerClass)
  }else if(gameTurn == 2){
    $('.whitePlayer').removeClass(currentPlayerClass)
    $('.blackPlayer').addClass(currentPlayerClass)
  }else{
    console.log('Reflect Game turn is failed. Maybe number of gameTurn is incorrect')
  }
}

resultController = function(){
  this.results = []
  this.view = new resultView()
}
resultController.prototype.init = function(){
  this.view.initresultsTable(this.results)
}

resultController.prototype.addResult = function(result){
  this.results.push(result)
  this.init()
}

resultView = function(){
  this.$resultsTable = $('.resultsTable')
  this.WHITE = 1
  this.BLACK = 2
}

resultView.prototype.parseResultsContents = function(results){
  let resultsContents = []
  for(let i in results){
    for(let h in results[i]['players']){
      if(results[i]['players'][h]['order'] == this.WHITE){
        playerWhite = `白(${results[i]['players'][h]['name']}): ${results[i]['othelloResult']['white']}`
      }
      if(results[i]['players'][h]['order'] == this.BLACK){
        playerBlack = `黒(${results[i]['players'][h]['name']}): ${results[i]['othelloResult']['black']}`
      }
    }
    if(results[i]['first_player'] == this.WHITE){
      orderContent = `先手: 白`
    }
    if(results[i]['first_player'] == this.BLACK){
      orderContent = `先手: 黒`
    }
    resultsContents.push(
      {
        'gameNum': i,
        'playerWhite': playerWhite,
        'playerBlack': playerBlack,
        'order': orderContent
      }
    )
  }
  return resultsContents
}


resultView.prototype.initresultsTable = function(results){
  this.$resultsTable.empty()
  let resultsContents = this.parseResultsContents(results)
  console.log(resultsContents)
  let $table = $('<table class="table table-striped"></table>')

  let $resultsTbody = $('<tbody>/tbody>')
  for(let i in resultsContents){
      console.log(`[info] ${resultsContents[i]}`)
      $resultTr = $('<tr></tr>')
      for(let key in resultsContents[i]){
        $resultTr.append(
              $(`<td>${resultsContents[i][key]}</td>`)
          )
      }
      $resultsTbody.append($resultTr)
  }
  $table.append($resultsTbody)
  this.$resultsTable.append($table)
}

gameOptionController = function(){
  this.api = new apiClient()
  this.view = new gameOptionView()
  this.initGameOption()
}

gameOptionController.prototype.initGameOption = function(){
  this.api.getAllUserInfo({}).then( (result) =>
    this.view.initGameOption(result['users'])
  )
}

gameOptionView = function(){
  this.$gameOptionForm = $('.gameOption')
  this.gameNumSelectorName = 'gameNumSelector'
  this.$othelloStartButton = $('<button class="btn btn-primary othelloStart">Start</button>')
  this.WHITE = 1
  this.BLACK = 2
}

gameOptionView.prototype.initGameOption = function(users){
  this.$gameOptionForm.empty()
  let $selectWhite = this.getSelector('white',users)
  let $selectBlack = this.getSelector('black',users)
  this.$gameOptionForm.append($selectWhite)
  this.$gameOptionForm.append($selectBlack)
  this.$gameOptionForm.append(this.getGameNumSelector())
  this.$gameOptionForm.append(this.$othelloStartButton)
  this.$othelloStartButton.click(function(){
    let whiteUser = {
      'userId': $('.whiteUserSelect option:selected').attr('userId'),
      'userName': $('.whiteUserSelect option:selected').attr('userName')
    }
    let blackUser = {
      'userId': $('.blackUserSelect option:selected').attr('userId'),
      'userName': $('.blackUserSelect option:selected').attr('userName')
    }
    let gameNum = parseInt($('.gameNumSelector option:selected').attr('gameNum'))
    console.log(gameNum)
    $(window).trigger('setOthelloControllerUser',[whiteUser,blackUser,gameNum])
  })
}

gameOptionView.prototype.getSelector = function(strColor,users){
  if(strColor != 'white' && strColor != 'black'){
    console.log('ERROR please input white or black')
    return null
  }
  console.log(users)
  let $selector = $(`<select class="form-control ${strColor}UserSelect"></select>`)
  for(let i in users){
    let $option = $(`<option userId="${users[i]['id']}" userName="${users[i]['username']}" >${strColor}: ${users[i]['username']} || ${users[i]['ipaddress']}:${users[i]['port']}${users[i]['urlpath']}</option>`)
    $selector.append($option)
  }
  return $selector
}

gameOptionView.prototype.getGameNumSelector = function(){
  let options = [
    1,
    5,
    10,
    50,
    100
  ]
  let $selector = $(`<select class="form-control ${this.gameNumSelectorName}"></select>`)
  for(let i in options){
    let $option = $(`<option gameNum="${options[i]}">${options[i]} games</option>`)
    $selector.append($option)
  }
  return $selector
}

gameController = function(){
  this.gameNum = null
  this.count = 0
  this.historys = []
  this.myOthelloController = new othelloController()
  this.myResultController = new resultController()
}

gameController.prototype.customEvent = function(){
  $(window).on('gameController', (event,othelloResult) => {
    if(othelloResult){
      console.log(othelloResult)
      this.myResultController.addResult(othelloResult)
    }
    if(this.count < this.gameNum){
      this.myOthelloController.restart()
      this.count++
    }
  });
  $(window).on('setOthelloControllerUser', (event,whiteUser,blackUser,gameNum) => {
    this.gameNum = gameNum
    console.log(this.gameNum)
    this.myOthelloController.setPlayers(whiteUser,blackUser)
  });
}

//Entrypoint
function main(){
  let myGameOptionController = new gameOptionController()
  let myGameController = new gameController()
  myGameController.customEvent()
  //bindEvent(myOthelloController)
}

//一人プレイ用に必要な関数
function bindEvent(othelloController){
  $('.othelloRow td').click(function(){
    let x = $(this).attr('x')
    let y = $(this).attr('y')
    let requestData = othelloController.getRequestData(x,y)
    othelloController.api.moveBoard(requestData)
    .then( (result) =>
      othelloController.personAction(result)
    )
    .then( (result) => {
      if(result){
        othelloController.intelligenceActionV1(false)
      }
    })
  })
}

main()

