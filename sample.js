othello = function(observe){
  this.name = "chuya"
  this.observe = observe
}

othello.prototype.notify = function(func){
  func()
  console.log(func)
  this.observe.update()
}

othello.prototype.hello = function(){
  console.log(this.name)
}

othello.prototype.run = function(){
  this.notify(this.hello)
}

kansi =  function(){
  this.name = "kansi"
}

kansi.prototype.update = function(context){
  if(context=="hello"){
    console.log(this.name)
  }
}

mykansi = new kansi()
myothello = new othello(mykansi)
myothello.run()
