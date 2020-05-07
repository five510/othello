function verifySourcecode(event){
    let api = new apiClient()
    requestData = {
        "souce_code": event.data.$InputCode.val()
    }
    api.verifySourcecode(requestData).then(function(result){
        console.log(result)    
    })
}

function registerSourcecode(event){
    let api = new apiClient()
    requestData = {
        "souce_code": event.data.$InputCode.val(),
        "name": event.data.$InputName.val()
    }
    api.registerSourcecode(requestData).then(function(result){
        console.log(result)    
    })
}

sourcecodeSubmitView = function($verifyCode,$registerCode,$InputCode,$InputName,verifyFunc,submitFunc){
    this.$verifyCode = $verifyCode
    this.$registerCode = $registerCode
    this.$InputCode = $InputCode
    this.$InputName = $InputName
    this.verifyFunc = verifyFunc
    this.submitFunc = submitFunc
    this.init()
}

sourcecodeSubmitView.prototype.init = function(){
    this.$verifyCode.click({$InputCode: this.$InputCode} ,this.verifyFunc)
    this.$registerCode.click({
        $InputCode: this.$InputCode,
        $InputName: this.$InputName
    },
    this.submitFunc
    )
}

function main(){
    let $verifyCode = $('#verifyCode')
    let $registerCode = $('#registerCode')
    let $InputCode = $('#InputCode')
    let $InputName = $('#InputName')
    let mysourcecodeSubmitView = new sourcecodeSubmitView($verifyCode,$registerCode,$InputCode,$InputName,verifySourcecode,registerSourcecode)
}
main()
