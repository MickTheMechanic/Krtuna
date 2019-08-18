// oversteering selection screen
let OversteeringScreen = {
	id : "oversteering"
};
OversteeringScreen.register = function() {
	UI.registerScreen(OversteeringScreen);
}
OversteeringScreen.close = function() {
};
OversteeringScreen.show = function() {
	console.log("show oversteering screen")
	OversteeringScreen.loadParts();
}

OversteeringScreen.loadParts = function() {
	let profile = ProfileScreen.getProfile();
	let eContainer = $("#oversteering_container");
	eContainer.attr("class", "");
	for ( var property in profile) {
		if (profile.hasOwnProperty(property)) {
			if (profile[property]) {
				eContainer.addClass("has_" + property);
			}
		}
	}
};
$(window).on("register-screens", OversteeringScreen.register);

// Oversteering turn entry screen
let OversteeringScreen_TurnEntry = {
	id : "oversteering_turnentry"
};
OversteeringScreen_TurnEntry.register = function() {
	UI.registerScreen(OversteeringScreen_TurnEntry);
}
OversteeringScreen_TurnEntry.close = function() {
};
OversteeringScreen_TurnEntry.show = function() {
	console.log("show oversteering turn entry screen")
	OversteeringScreen.loadParts();
}

OversteeringScreen_TurnEntry.show = function() {
	console.log("show oversteering turn entry screen");
	OversteeringScreen.loadParts();
}

$(window).on("register-screens", OversteeringScreen_TurnEntry.register);

// oversteering turn apex screen
let OversteeringScreen_TurnApex = {
	id : "oversteering_turnapex"
};
OversteeringScreen_TurnApex.register = function() {
	UI.registerScreen(OversteeringScreen_TurnApex);
}
OversteeringScreen_TurnApex.close = function() {
};
OversteeringScreen_TurnApex.show = function() {
	console.log("show oversteering turn apex screen");
	OversteeringScreen.loadParts();
}
$(window).on("register-screens", OversteeringScreen_TurnApex.register);

// oversteering turn exit screen
let OversteeringScreen_TurnExit = {
	id : "oversteering_turnexit"
};
OversteeringScreen_TurnExit.register = function() {
	UI.registerScreen(OversteeringScreen_TurnExit);
}
OversteeringScreen_TurnExit.close = function() {
};
OversteeringScreen_TurnExit.show = function() {
	console.log("show oversteering turn exit screen");
	OversteeringScreen.loadParts();
}
$(window).on("register-screens", OversteeringScreen_TurnExit.register);

let Oversteering = {};
Oversteering.adjust = function(id) {
	console.log("adjusting", id);
	let form = $("#oversteering_turnentry .adjust_form");
	form.find("label").text(id);
	form.find("input[name='id']").val(id);
	form.find("input[name='value']").val(0);
	form.removeClass("hidden");
}

Oversteering.setValue = function(element) {
	element = $(element);
	let form = element.parent();
	console.log(form)
	let id = form.find("input[name='id']").val();
	console.log(form.find("input[name=id]"));
	console.log("Set value of " + id + " to " + element.val())
}
