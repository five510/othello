function log(){
    console.log('ok')
}

function main(){
    let $el = $('.userTable')
    myUserView = new userView($el,log)
    getAllUserInfo({})
}

function getAllUserInfo(requestData){
    $.ajax({
        url: "/api/user/describe",
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
        console.log(result['users'])
        myUserView.initUserTable(result['users'])
      }).fail(function(result) {
        console.log('[ERROR] /api/user/describe is failed')
        console.log(result)
      });
}

main()
