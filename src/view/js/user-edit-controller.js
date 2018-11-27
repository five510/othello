function log(){
    console.log('ok')
}

function main(){
    let $el = $('#createUser')
    $el.click(createUser)
}

function getInputData(){
    return {
        'username': $('#InputUser').val(),
        'mail': $('#InputMail').val(),
        'ipaddress': $('#InputIP').val(),
        'port': $('#InputPort').val(),
        'urlpath': $('#InputUrl').val()
    }
}

function createUser(){
    let requestData = getInputData()
    $.ajax({
        url: "/api/user/create",
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
        console.log('hoge')
        window.location.href = 'user.html'
      }).fail(function(result) {
        console.log('[ERROR] /api/user/create is failed')
        console.log(result)
        window.location.href = 'user.html'
      });
}


main()
