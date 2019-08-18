let HomeScreen={ id:"home"};
HomeScreen.register=function(){
	UI.registerScreen(HomeScreen);
}
HomeScreen.close=function(){};
HomeScreen.show=function(){
	console.log("show home screen")
}
$(window).on("register-screens", HomeScreen.register);