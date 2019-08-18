let UI = {};

UI.escreen = $("#screen");
UI.currentScreen = null;
UI.screens = {};
UI.clearScreen = function() {
	if (UI.currentScreen) {
		$("body").removeClass(UI.currentScreen.id);
		UI.currentScreen.close();
		UI.currentScreen = null;
	}
	UI.escreen.empty();
}
UI.handleTokenChange = function() {
	var token = "" + window.location.hash;
	token = token.substring(1, token.length);
	console.log("handling token", token);
	if (token == "")
		token = "home";
	var screen = UI.screens[token];
	if (!screen) {
		console.error("screen "+token+" doesn't exist, going to home screen");
		window.location.hash="home";
		return;
	}
	UI.showScreen(screen);
}
UI.showScreen = function(screen) {
	UI.clearScreen();
	UI.currentScreen = screen;
	UI.currentScreen.show();
	$("body").addClass(screen.id);
}
UI.defer = function(callback) {
	setTimeout(callback, 1);
}
UI.init = function() {
	console.log("initializing UI");
	$(window).on('hashchange', UI.handleTokenChange);
	$(window).trigger("register-screens");
	UI.defer(function() {
		$(window).trigger("hashchange")
	});
}
UI.registerScreen = function(screen) {
	console.debug("Registering screen ", screen.id)
	UI.addCssRule("."+screen.id+" #"+screen.id+"{display:block}");
	UI.screens[screen.id] = screen;
}
UI.addCssRule=function(rule){
	console.debug("UI","adding CSS",rule);
	var sheet = window.document.styleSheets[0];
	sheet.insertRule(rule, sheet.cssRules.length);
}
$(window).on("initialize", UI.init);
