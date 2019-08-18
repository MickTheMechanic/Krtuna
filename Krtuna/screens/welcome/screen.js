let WelcomeScreen={ id:"welcome"};
WelcomeScreen.register=function(){
	UI.registerScreen(WelcomeScreen);
}
WelcomeScreen.close=function(){};
WelcomeScreen.show=function(){
	console.log("show welcome screen")
}
WelcomeScreen.maybeShowWelcomeScreen=function(){
	var hideScreen = localStorage.getItem("hide_welcome_screen");
	if (!hideScreen){
		window.location.hash="welcome";
	}
}

$(window).on("register-screens", WelcomeScreen.register);
$(window).on("app-loaded",WelcomeScreen.maybeShowWelcomeScreen);


let WelcomeScreen2={ id:"welcome2"};
WelcomeScreen2.register=function(){
	UI.registerScreen(WelcomeScreen2);
}
WelcomeScreen2.close=function(){};
WelcomeScreen2.show=function(){
	console.log("show welcome screen")
}


WelcomeScreen2.dismissTemporarily=function(){
	window.location.hash="home";
}

WelcomeScreen2.dismissPermanently=function(){
	localStorage.setItem("hide_welcome_screen",true);
	window.location.hash="home";
}

$(window).on("register-screens", WelcomeScreen2.register);


