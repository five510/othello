/*
sourcecodeの情報を受け取ってhtmlとして描画するためのclass
*/

sourcecodeView = function($el,confirmFunc){
    this.$sourcecodeTable = $el
    this.confirmFunc = confirmFunc
}

sourcecodeView.prototype.initsourcecodeTable = function(sourcecodes){
    this.$sourcecodeTable.empty()
    let $table = $('<table class="table table-striped"></table>')
    let $sourcecodeThead = $('<thead><tr></tr></thead>')
    for(let key in sourcecodes[0]){
        $sourcecodeThead.append(
            $(`<th>${key}</th>`)
        )
    }
    $table.append($sourcecodeThead)
    let $sourcecodeTbody = $('<tbody>/tbody>')
    for(let i in sourcecodes){
        console.log(`[info] ${sourcecodes[i]}`)
        $sourcecodeTr = $('<tr></tr>')
        for(let key in sourcecodes[i]){
            $sourcecodeTr.append(
                $(`<td>${sourcecodes[i][key]}</td>`)
            )
        }
        this.addConfirmCell($sourcecodeTr,sourcecodes[i]['id'])
        $sourcecodeTbody.append($sourcecodeTr)
    }
    $table.append($sourcecodeTbody)
    this.$sourcecodeTable.append($table)
}

sourcecodeView.prototype.addConfirmCell = function($tr,sourceCodeId){
    let button = $('<a href="#" sourcecodeid="' + sourceCodeId + '" class="btn btn-success" data-toggle="modal" data-target="#sourcecodeModal">Confirm</a>')
    this.addConfirmFunc(button)
    $tr.append(button)
} 

sourcecodeView.prototype.addConfirmFunc = function($el){
    $el.click({sourcecodeid: $el.attr('sourcecodeid')} ,this.confirmFunc)
}
