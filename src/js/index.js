var otheloArry = []
var otheloBody = $('.otheloBody')
var otheloNum = 8


function init(){
  initOtheroArry()
  initOtheloField()
  $('.otheloRow td').click(run)
}

$('.otheloRow td').click(function(){console.log()})

function initOtheloField(){
  otheloBody.empty()
  for(let i = 0 ; otheloNum >i ; i++){
    let otheloRow = $('<tr></tr>',{
      addClass: 'otheloRow'
    }).append(
      $('<th>'+ (i + 1) +'</th>')
    )
    for(let j = 0 ; otheloNum >j ; j++){
      otheloRow.append(
        $('<td></td>',{
          place: otheloNum*i + (j+1),
          addClass: getColorFromNum(otheloArry[i][j])
        })
      )
    }
    otheloBody.append(otheloRow)
  }
}

function initOtheroArry(){
  for(let i = 0 ; otheloNum > i ; i++){
    let eachRow = []
    for(let j = 0 ; otheloNum > j ; j++){
      eachRow[j] = 0
    }
    otheloArry[i] = eachRow
  }
  otheloArry[3][3] = 1
  otheloArry[3][4] = 2
  otheloArry[4][3] = 2
  otheloArry[4][4] = 1
}



function reflectViewOtheloField(){
  let rows = otheloBody.children()
  for(let i = 0 ; rows.length >i ; i++){
    let eachCells = $(rows[i]).children()
    // when j == 0 , return th. so j start 1
    for(let j = 1 ; eachCells.length >j ; j++){
      $(eachCells[j]).removeClass()
      $(eachCells[j]).addClass(
        getColorFromNum(otheloArry[i][j-1])
      )
    }
  }
}

// 0 -> defaults 1 -> white 2 -> black
function getColorFromNum(num){
  if(num == 0){ return 'green' }
  if(num == 1){ return 'white' }
  if(num == 2){ return 'black' }
}

function duplicateAlert(culunm,row){
  if( otheloArry[culunm][row] == 0){ return }
  if( otheloArry[culunm][row] == 1 || theloArry[culunm][row] == 2){
    alert('This cell already occupied...')
  }
}

function run(){
  let selectedPlace = $(this).attr('place')
  let culunm = parseInt(selectedPlace/otheloNum)
  let row = selectedPlace%otheloNum - 1
  duplicateAlert(culunm,row)
  otheloArry[culunm][row] = 1
  reflectViewOtheloField()
}

init()
