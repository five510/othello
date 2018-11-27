apiClient = function(){}

apiClient.prototype.getInitBoard  = function(requestData){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "/api/othello-init",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData)
          }).done(function(result){
            resolve(result)
          }).fail(function(result) {
            console.log('[ERROR] /api/othello-init is failed')
            reject(result)
          });
    })
}
    
apiClient.prototype.moveBoard = function(requestData){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "/api/othello-move",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData)
            /*
            JSON.stringify({
            'current_othello_board': [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0,9, 0, 0, 0], [0, 0, 0, 1, 2, 9, 0, 0], [0, 0, 9, 2, 1, 0, 0, 0], [0, 0, 0, 9,0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
            'next_move': {
            'row_num': 2,
            'column_num': 4
            },
            'current_turn': 1
        })
            */
        }).done(function(result) {
            resolve(result)
        }).fail(function(result) {
            console.log('[ERROR] /api/othello-move is failed')
            reject(result)
        });
    })
}

apiClient.prototype.moveIntelligenceV1 = function(requestData){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "/api/othello-intelligence-v1",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData)
            /*
            JSON.stringify({
            'current_othello_board': [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0,9, 0, 0, 0], [0, 0, 0, 1, 2, 9, 0, 0], [0, 0, 9, 2, 1, 0, 0, 0], [0, 0, 0, 9,0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
            'next_move': {
            'row_num': 2,
            'column_num': 4
            },
            'current_turn': 1
        })
            */
        }).done(function(result) {
          resolve(result)
        }).fail(function(result) {
          console.log('[ERROR] /api/othello-move is failed')
          reject(result)
        });
    })
}

apiClient.prototype.getAllUserInfo = function(requestData){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "/api/user/describe",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData)
            /*
            JSON.stringify({
              'cell_num': 8,
              'first_turn': 1
            })
            */
          }).done(function(result){
            resolve(result)
          }).fail(function(result) {
            console.log('[ERROR] /api/user/describe is failed')
            reject(result)
          });
    })
}

apiClient.prototype.createUser = function(requestData){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "/api/user/create",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData)
            /*
            JSON.stringify({
              'cell_num': 8,
              'first_turn': 1
            })
            */
          }).done(function(result){
            resolve(result)
          }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
            console.log('[ERROR] /api/user/create is failed')
            reject(result)
          });
    })
}