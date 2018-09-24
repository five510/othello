

Othelo = function(otheloBodySelector,otheloNum){
  this.otheloArry = []
  this.otheloBody = $(otheloBodySelector)
  this.otheloNum = otheloNum
  this.gameTurn = 1 // gameTurn is 1 or 2
  this.getColorFromNum = function(num){
    if(num == 0){ return 'green' }
    if(num == 1){ return 'white' }
    if(num == 2){ return 'black' }
    if(num == 3){ return 'lightgreen' }
  }
}

Othelo.prototype.initOtheloField = function(){
  this.otheloBody.empty()
  for(let i = 0 ; this.otheloNum >i ; i++){
    let otheloRow = $('<tr></tr>',{
      addClass: 'otheloRow'
    }).append(
      $('<th>'+ (i + 1) +'</th>')
    )
    for(let j = 0 ; this.otheloNum >j ; j++){
      otheloRow.append(
        $('<td></td>',{
          place: this.otheloNum*i + (j),
          addClass: this.getColorFromNum(this.otheloArry[i][j])
        })
      )
    }
    this.otheloBody.append(otheloRow)
  }
}

Othelo.prototype.initOtheroArry = function(){
  for(let i = 0 ; this.otheloNum > i ; i++){
    let eachRow = []
    for(let j = 0 ; this.otheloNum > j ; j++){
      eachRow[j] = 0
    }
    this.otheloArry[i] = eachRow
  }
  this.otheloArry[3][3] = 1
  this.otheloArry[3][4] = 2
  this.otheloArry[4][3] = 2
  this.otheloArry[4][4] = 1
}

Othelo.prototype.reflectViewOtheloField = function(){
  let rows = this.otheloBody.children()
  for(let i = 0 ; rows.length >i ; i++){
    let eachCells = $(rows[i]).children()
    // when j == 0 , return th. so j start 1
    for(let j = 1 ; eachCells.length+1 >j ; j++){
      $(eachCells[j]).removeClass()
      $(eachCells[j]).addClass(
        this.getColorFromNum(this.otheloArry[i][j-1])
      )
    }
  }
}

Othelo.prototype.possibleMove = function(culunm,row){
  possibleMove = []
  //そのマスが埋まっていないか確認
  if( this.otheloArry[culunm][row] == 1 || this.otheloArry[culunm][row] == 2){return possibleMove}
  //隣があいてのマスか確認する
  for(let dy = - 1 ; 1 >= dy ; dy++){
    let nextY = culunm + dy
    if(nextY < 0 || this.otheloNum <= nextY){ continue }
    for(let dx = - 1 ; 1 >= dx ; dx++){
      let nextX = row + dx
      if(nextX < 0 || this.otheloNum <= nextX){ continue }
      //何も埋まっていない場合はcnotinue
      if(this.otheloArry[nextY][nextX] == 0){ continue }
      //自分と同じ色の場合はcontinue
      if( this.otheloArry[nextY][nextX] == this.gameTurn ){continue }
      let turnCells = [{
        y: nextY,
        x: nextX
      }]
      let result = this.checkRegression(dy,dx,nextY,nextX,this.gameTurn,turnCells)
      if(result['isPossible']){
        possibleMove.push(result)
      }
    }
  }
  return possibleMove
}

Othelo.prototype.checkRegression = function(dy,dx,y,x,player,turnCells){
  let result = {
    isPossible: false,
    turnCells: turnCells
  }
  //マイナスと８を超える場合はFalse
  if(dy+y < 0 || this.otheloNum <= dy+y){
    return result
  }else if(dx+x < 0 || this.otheloNum <= dx+x){
    return result
  }

  if( this.otheloArry[dy+y][dx+x] == 0){
    //埋まっていない場合はFalse
    return result
  }else if(this.otheloArry[dy+y][dx+x] == player){
    //自分のコマが見つかった場合はTrue
    result['isPossible'] = true
    result['ny'] = dy+y
    result['nx'] = dx+x
    return result
  }else if(this.otheloArry[dy+y][dx+x] != player){
    //相手のコマが見つかった場合は再帰処理
    turnCells.push({
      y: dy+y,
      x: dx+x
    })
    return this.checkRegression(dy,dx,dy+y,dx+x,player,turnCells)
  }else {
    alert('gameTurn is invalid')
  }
}

Othelo.prototype.changeGameTurn = function(){
  if(this.gameTurn == 1){
    this.gameTurn = 2
    console.log('Game turn is ' + this.gameTurn)
  }else  if(this.gameTurn == 2){
    this.gameTurn = 1
    console.log('Game turn is ' + this.gameTurn)
  }
}

Othelo.prototype.changeCells = function(possibleLists){
  for(let i = 0 ; possibleLists.length >i ; i++){
    for(let j = 0 ; possibleLists[i]['turnCells'].length >j ; j++){
      let x = possibleLists[i]['turnCells'][j]['x']
      let y = possibleLists[i]['turnCells'][j]['y']
      this.otheloArry[y][x] = this.gameTurn
    }
  }
}

Othelo.prototype.changeScore = function(){
  let countFirstPlayer = 0
  let countSecondPlayer = 0
  for(let i = 0 ; this.otheloNum > i ; i++){
    for(let j = 0 ; this.otheloNum > j ; j++){
      if(this.otheloArry[i][j] == 1){
        countFirstPlayer++
      }else if(this.otheloArry[i][j] == 2){
        countSecondPlayer++
      }
    }
  }
  $('.firstPlayer').text(countFirstPlayer)
  $('.secondPlayer').text(countSecondPlayer)
}

Othelo.prototype.possibleArray = function(){
  let possibleArray = []
  for(let i = 0 ; this.otheloNum  >i ; i++){
    possibleRow = []
    for(let j = 0 ; this.otheloNum  >j ; j++){
      let possibleLists =  this.possibleMove(i,j)
      if(possibleLists.length > 0){
        possibleRow.push(true)
      }else{
        possibleRow.push(false)
      }
    }
    possibleArray.push(possibleRow)
  }
  return possibleArray
}

Othelo.prototype.reflectNext = function(possibleArray){
  let rows = this.otheloBody.children()
  for(let i = 0 ; rows.length >i ; i++){
    let eachCells = $(rows[i]).children()
    // when j == 0 , return th. so j start 1
    for(let j = 1 ; eachCells.length+1 >j ; j++){
      if(possibleArray[i][j-1]){
        $(eachCells[j]).removeClass()
        $(eachCells[j]).addClass(
          this.getColorFromNum(3)
        )
      }
    }
  }
}


function init(){
  myOthelo = new Othelo('.otheloBody',8)
  myOthelo.initOtheroArry()
  myOthelo.initOtheloField()

  //viewerのコントロール
  $('.otheloRow td').click(function(){
    let selectedPlace = $(this).attr('place')
    let culunm = parseInt(selectedPlace / myOthelo.otheloNum)
    let row = selectedPlace % myOthelo.otheloNum
    let possibleLists =  myOthelo.possibleMove(culunm,row)
    if(possibleLists.length > 0){
      myOthelo.otheloArry[culunm][row] = myOthelo.gameTurn
      myOthelo.changeCells(possibleLists)
      myOthelo.changeGameTurn()
      myOthelo.reflectViewOtheloField()
      let possibleArray = myOthelo.possibleArray()
      myOthelo.reflectNext(possibleArray)
      myOthelo.changeScore()
    }else{
      alert('This cell already occupied or there is no availavle move')
    }
  })
}
init()
