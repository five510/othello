//Entrypoint
function main(){
  let otheloNum = 8
  let $el = $('.otheloBody')
  myOthelo = new othello(otheloNum)
  myView = new othelloView($el,otheloNum)
  myView.reflectViewothelloField(myOthelo.othelloArry)
  myView.reflectNext(myOthelo.possibleMoves)
  myView.changeScore(myOthelo.othelloArry)
  myView.reflectGameTurn(myOthelo.gameTurn)
  //Hard coding
  $('.othelloRow td').click(function(){
    let selectedPlace = $(this).attr('place')
    let res = myOthelo.move(selectedPlace)
    if(res['isMove']){
      myView.reflectViewothelloField(res['othelloArry'])
      myView.reflectGameTurn(res['gameTurn'])
      myView.changeScore(res['othelloArry'])
      myView.reflectNext(res['possibleMoves'])
    }else{
      alert('This cell is not available')
    }
  })
}
main()
