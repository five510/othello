function getSourcecodeDetail(event){
    let api = new apiClient()
    let $sourceCodeContent =$('#sourceCodeContent')
    $sourceCodeContent.empty()
    api.getSourcecodeDetail(event.data.sourcecodeid).then(function(result){
        $sourceCodeContent.text(result['source_code'])
      })
}

function init(view,api){
    api.getAllSourcecode({}).then(function(result){
        view.initsourcecodeTable(result)
      })
}

function main(){
    let $el = $('#sourceCodeTable')
    let mysourcecodeView = new sourcecodeView($el,getSourcecodeDetail)
    let api = new apiClient()
    init(mysourcecodeView,api)
}
main()
