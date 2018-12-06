navigationView = function(){
	this.$othelloNavigation = $('.othelloNavigation')
	this.title = 'Othello'
	this.mainPath = 'othello.html'
	this.menus = [
		new menu('Othello','othello.html'),
		new menu('User','user.html'),
		new menu('New User','user-edit.html'),
		new menu('History','history.html')
	]
}

menu = function(name,path){
	this.name = name
	this.path = path
}

navigationView.prototype.initOthelloNavigation = function(){
	this.$othelloNavigation.empty()
	let navbarId = 'navbarOthello'
	let $nav = $('<nav class="navbar navbar-default"></nav>')
	let $container  = $('<div class="container-fluid"></div>')
	let $header = $(`
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#${navbarId}">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="${this.mainPath}">${this.title}</a>
		</div>
	`)
	let $menu = $(`<div class="collapse navbar-collapse" id="${navbarId}"></div>`)
	let $unorderedList = $('<ul class="nav navbar-nav"></ul>')
	for(let i in this.menus){
		$unorderedList.append($(`
			<li>
				<a href="${this.menus[i].path}">${this.menus[i].name}</a>
			</li>
		`))
	}
	$menu.append($unorderedList)

	$container.append($header)
	$container.append($menu)
	$nav.append($container)
	this.$othelloNavigation.append($nav)

}

function main(){
	let myNavigationView = new navigationView()
	myNavigationView.initOthelloNavigation()
}
main()