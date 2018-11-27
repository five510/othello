function log(){
    console.log('ok')
}

function init(view,api){
    api.getAllUserInfo({}).then(function(result){
        view.initUserTable(result['users'])
      })
}

function main(){
    let $el = $('.userTable')
    let myUserView = new userView($el,log)
    let api = new apiClient()
    init(myUserView,api)
}
main()
