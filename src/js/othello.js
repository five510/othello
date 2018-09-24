

othello = function(othelloNum){
  this.othelloNum = othelloNum
  this.gameTurn = 1 // gameTurn is 1 or 2
  this.possibleMoves = []
  this.othelloArry = []
  this.initOthelloArry()
  this.setPossibleMoves()
}

othello.prototype.initOthelloArry = function(){
  this.othelloArry = []
  for(let i = 0 ; this.othelloNum > i ; i++){
    let eachRow = []
    for(let j = 0 ; this.othelloNum > j ; j++){
      eachRow[j] = 0
    }
    this.othelloArry[i] = eachRow
  }
  let center1 = this.othelloNum / 2
  let center2 = center1 - 1
  this.othelloArry[center1][center1] = 1
  this.othelloArry[center1][center2] = 2
  this.othelloArry[center2][center1] = 2
  this.othelloArry[center2][center2] = 1
}

othello.prototype.setPossibleMoves = function(){
  //init possibleMoves
  this.possibleMoves = []
  for(let i = 0 ; this.othelloNum>i ; i++){
    let possibleRow = []
    for(let j = 0 ; this.othelloNum>j ; j++){
      let possibleLists =  this.getPossibleMove(i,j)
      possibleRow.push(possibleLists)
    }
    this.possibleMoves.push(possibleRow)
  }
}

othello.prototype.getPossibleMove = function(culunm,row){
  let possibleMove = []
  //そのマスが埋まっていないか確認
  if( this.othelloArry[culunm][row] == 1 || this.othelloArry[culunm][row] == 2){return possibleMove}
  //隣があいてのマスか確認する
  for(let dy = - 1 ; 1 >= dy ; dy++){
    let nextY = culunm + dy
    if(nextY < 0 || this.othelloNum <= nextY){ continue }
    for(let dx = - 1 ; 1 >= dx ; dx++){
      let nextX = row + dx
      if(nextX < 0 || this.othelloNum <= nextX){ continue }
      //何も埋まっていない場合はcnotinue
      if(this.othelloArry[nextY][nextX] == 0){ continue }
      //自分と同じ色の場合はcontinue
      if( this.othelloArry[nextY][nextX] == this.gameTurn ){continue }
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

othello.prototype.checkRegression = function(dy,dx,y,x,player,turnCells){
  let result = {
    isPossible: false,
    turnCells: turnCells
  }
  //マイナスと８を超える場合はFalse
  if(dy+y < 0 || this.othelloNum <= dy+y){
    return result
  }else if(dx+x < 0 || this.othelloNum <= dx+x){
    return result
  }

  if( this.othelloArry[dy+y][dx+x] == 0){
    //埋まっていない場合はFalse
    return result
  }else if(this.othelloArry[dy+y][dx+x] == player){
    //自分のコマが見つかった場合はTrue
    result['isPossible'] = true
    result['ny'] = dy+y
    result['nx'] = dx+x
    return result
  }else if(this.othelloArry[dy+y][dx+x] != player){
    //相手のコマが見つかった場合は再帰処理
    turnCells.push({
      y: dy+y,
      x: dx+x
    })
    return this.checkRegression(dy,dx,dy+y,dx+x,player,turnCells)
  }
}

othello.prototype.changeGameTurn = function(){
  if(this.gameTurn == 1){
    this.gameTurn = 2
  }else  if(this.gameTurn == 2){
    this.gameTurn = 1
  }
}

othello.prototype.setOthelloArry = function(culunm,row){
  let possibleMove = this.possibleMoves[culunm][row]
  for(let i = 0 ; possibleMove.length >i ; i++){
    for(let j = 0 ; possibleMove[i]['turnCells'].length >j ; j++){
      let x = possibleMove[i]['turnCells'][j]['x']
      let y = possibleMove[i]['turnCells'][j]['y']
      this.othelloArry[y][x] = this.gameTurn
    }
  }
  this.othelloArry[culunm][row] = this.gameTurn
}

othello.prototype.parseCulunmAndRow = function(place){
  return {
    culunm: parseInt(place / this.othelloNum),
    row: place % this.othelloNum
  }
}

othello.prototype.validateMove = function(culunm,row){
  let possibleMove = this.possibleMoves[culunm][row]
  if(possibleMove.length  == 0){
    return false
  }else{
    return true
  }
}

//外部から呼び出されるメソッド
/*
以下を返し、isMoveに応じてcontllerがviewを操作する.
response = {
  isMove: boolean,
  gameTurn: this.gameTurn,
  possibleMoves: this.possibleMoves,
  othelloArry: this.othelloArry
}
*/
othello.prototype.move = function(selectedPlace){
  let response = {
    isMove: false,
    gameTurn: this.gameTurn,
    possibleMoves: this.possibleMoves,
    othelloArry: this.othelloArry
  }
  let r = this.parseCulunmAndRow(selectedPlace)
  //次の可能な手からその手が有効かどうか調べる(ダメならコールバック)
  if(this.validateMove(r['culunm'],r['row'])){
    //othelloArryの変更
    this.setOthelloArry(r['culunm'],r['row'])
    //手番の変更
    this.changeGameTurn()
    //次の可能な手を検索
    this.setPossibleMoves()
    response['isMove'] = true
    response['gameTurn'] = this.gameTurn
    response['possibleMoves'] = this.possibleMoves
    response['othelloArry'] = this.othelloArry
    return response
  }else{
    return response
  }

}
