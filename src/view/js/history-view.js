historyView = function($el){
    this.$historyTable = $el
}

historyView.prototype.initHistoryTable = function(historys){
    this.$historyTable.empty()
    let $table = $('<table class="table table-striped"></table>')
    let $historyhead = $('<thead><tr></tr></thead>')
    for(let key in historys[0]){
        $historyhead.append(
            $(`<th>${key}</th>`)
        )
    }
    $table.append($historyhead)
    let $historyTbody = $('<tbody>/tbody>')
    for(let i in historys){
        console.log(`[info] ${historys[i]}`)
        $historyTr = $('<tr></tr>')
        for(let key in historys[i]){
            $historyTr.append(
                $(`<td>${historys[i][key]}</td>`)
            )
        }
        $historyTbody.append($historyTr)
    }
    $table.append($historyTbody)
    this.$historyTable.append($table)
}