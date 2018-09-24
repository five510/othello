othelloView = function($el,othelloNum){
  this.$othelloBody = $el
  this.othelloNum = othelloNum
  this.initothelloField()
}

othelloView.prototype.initothelloField = function(){
  this.$othelloBody.empty()
  for(let i = 0 ; this.othelloNum  >i ; i++){
    let othelloRow = $('<tr></tr>',{
      addClass: 'othelloRow'
    }).append(
      $('<th>'+ (i + 1) +'</th>')
    )
    for(let j = 0 ; this.othelloNum  >j ; j++){
      othelloRow.append(
        $('<td></td>',{
          place: this.othelloNum *i + (j)
        })
      )
    }
    this.$othelloBody.append(othelloRow)
  }
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

othelloView.prototype.changeScore = function(){
  let countFirstPlayer = 0
  let countSecondPlayer = 0
  for(let i = 0 ; this.othelloNum > i ; i++){
    for(let j = 0 ; this.othelloNum > j ; j++){
      if(this.othelloArry[i][j] == 1){
        countFirstPlayer++
      }else if(this.othelloArry[i][j] == 2){
        countSecondPlayer++
      }
    }
  }
  $('.firstPlayer').text(countFirstPlayer)
  $('.secondPlayer').text(countSecondPlayer)
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
  if(num == 3){ return 'lightgreen' }
}
