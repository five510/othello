function init(view,api){
    api.getAllHistoryInfo({}).then(function(result){
        console.log(result)
        view.initHistoryTable(result['history'])
      })
}

function main(){
    let $el = $('.historyTable')
    let myHistoryView = new historyView($el)
    let api = new apiClient()
    init(myHistoryView,api)
}
main()