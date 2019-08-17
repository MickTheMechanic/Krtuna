// understeering selection screen
let UndersteeringScreen = {
	id : "understeering"
};
UndersteeringScreen.register = function() {
	UI.registerScreen(UndersteeringScreen);
}
UndersteeringScreen.close = function() {
};
UndersteeringScreen.show = function() {
	console.log("show understeering screen")
	UndersteeringScreen.loadParts();
}

UndersteeringScreen.loadParts = function() {
	let profile = ProfileScreen.getProfile();
	let eContainer = $("#understeering_container");
	eContainer.attr("class", "");
	for ( var property in profile) {
		if (profile.hasOwnProperty(property)) {
			UI.addCssRule(".has_"+property+" .needs_"+property+" {display:block}");
			if (profile[property]) {
				eContainer.addClass("has_" + property);
			}
		}
	}
};
$(window).on("register-screens", UndersteeringScreen.register);

// understeering turn entry screen
let UndersteeringScreen_TurnEntry = {
	id : "understeering_turnentry"
};
UndersteeringScreen_TurnEntry.register = function() {
	UI.registerScreen(UndersteeringScreen_TurnEntry);
}
UndersteeringScreen_TurnEntry.close = function() {
};
UndersteeringScreen_TurnEntry.show = function() {
	console.log("show understeering turn entry screen")
	UndersteeringScreen.loadParts();
}

UndersteeringScreen_TurnEntry.show = function() {
	console.log("show understeering turn entry screen");
	UndersteeringScreen.loadParts();
}

$(window).on("register-screens", UndersteeringScreen_TurnEntry.register);

// understeering turn apex screen
let UndersteeringScreen_TurnApex = {
	id : "understeering_turnapex"
};
UndersteeringScreen_TurnApex.register = function() {
	UI.registerScreen(UndersteeringScreen_TurnApex);
}
UndersteeringScreen_TurnApex.close = function() {
};
UndersteeringScreen_TurnApex.show = function() {
	console.log("show understeering turn apex screen");
	UndersteeringScreen.loadParts();
}
$(window).on("register-screens", UndersteeringScreen_TurnApex.register);

// understeering turn exit screen
let UndersteeringScreen_TurnExit = {
	id : "understeering_turnexit"
};
UndersteeringScreen_TurnExit.register = function() {
	UI.registerScreen(UndersteeringScreen_TurnExit);
}
UndersteeringScreen_TurnExit.close = function() {
};
UndersteeringScreen_TurnExit.show = function() {
	console.log("show understeering turn exit screen");
	UndersteeringScreen.loadParts();
}
$(window).on("register-screens", UndersteeringScreen_TurnExit.register);

let Understeering = {};
Understeering.adjust = function(id) {
	console.log("adjusting", id);
	let form = $("#understeering_turnentry .adjust_form");
	form.find("label").text(id);
	form.find("input[name='id']").val(id);
	form.find("input[name='value']").val(0);
	form.removeClass("hidden");
}

Understeering.setValue = function(element) {
	element = $(element);
	let form = element.parent();
	console.log(form)
	let id = form.find("input[name='id']").val();
	console.log(form.find("input[name=id]"));
	console.log("Set value of " + id + " to " + element.val())
}
