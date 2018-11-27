/*
userの情報を受け取ってhtmlとして描画するためのclass
*/

userView = function($el,editFunc){
    this.$userTable = $el
    this.editFunc = editFunc
}

userView.prototype.initUserTable = function(users){
    this.$userTable.empty()
    let $table = $('<table class="table table-striped"></table>')
    let $userThead = $('<thead><tr></tr></thead>')
    for(let key in users[0]){
        $userThead.append(
            $(`<th>${key}</th>`)
        )
    }
    $table.append($userThead)
    let $userTbody = $('<tbody>/tbody>')
    for(let i in users){
        console.log(`[info] ${users[i]}`)
        $userTr = $('<tr></tr>')
        for(let key in users[i]){
            $userTr.append(
                $(`<td>${users[i][key]}</td>`)
            )
        }
        this.addEditCell($userTr)
        $userTbody.append($userTr)
    }
    $table.append($userTbody)
    console.log()
    this.$userTable.append($table)
}

userView.prototype.addEditCell = function($tr){
    let button = $('<a href="#" class="btn btn-success">edit</a>')
    this.addEditFunc(button)
    $tr.append(button)
} 

userView.prototype.addEditFunc = function($el){
    $el.click(this.editFunc)
}
