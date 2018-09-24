//Entrypoint
function main(){
  let otheloNum = 8
  let $el = $('.otheloBody')
  myOthelo = new othello(otheloNum)
  myView = new othelloView($el,otheloNum)
  myView.reflectViewothelloField(myOthelo.othelloArry)
  myView.reflectNext(myOthelo.possibleMoves)
  //click時の振る舞いをかく
  $('.othelloRow td').click(function(){
    let selectedPlace = $(this).attr('place')
    let res = myOthelo.move(selectedPlace)
    if(res['isMove']){
      myView.reflectViewothelloField(res['othelloArry'])
      myView.reflectNext(res['possibleMoves'])
      console.log('Game turn is ' + res['gameTurn'])
    }else{
      alert('This cell is not available')
    }

  })
}
main()
