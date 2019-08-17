// tyre selection screen
let TyreScreen = {
	id : "tyres"
};
TyreScreen.register = function() {
	UI.registerScreen(TyreScreen);
}
TyreScreen.close = function() {
};
TyreScreen.show = function() {
	console.log("show tyre screen")
	TyreScreen.decorateDOM();
	TyreScreen.loadParts();
}
TyreScreen.loadParts=function(){
	let profile = ProfileScreen.getProfile();
	let tyres = $("#tyre_container");
	for (var property in profile) {
	    if (profile.hasOwnProperty(property)) {
	    	tyres.removeClass("has_"+property);
	    	if (profile[property])
	    		tyres.addClass("has_"+property);
	    }
	}
}

TyreScreen.onCategoryClicked=function(e){
	let eButton=$(e.target)
	let eCollapsible = eButton.parent(".collapsible");
	console.log("parent",eCollapsible);
	$("#tyres .collapsible").removeClass("active");
	eCollapsible.addClass("active");
}

TyreScreen.decorateDOM=function(){
	if ($("#tyres").hasClass("decorated"))
		return;
	$("#tyres").addClass("decorated");
	$("#tyres .collapsible button").on("click", TyreScreen.onCategoryClicked);
}
$(window).on("register-screens", TyreScreen.register);


// tyre outer front screen
let TyreScreen_Outer_F = {
	id : "tyre_outer_f"
};
TyreScreen_Outer_F.register = function() {
	UI.registerScreen(TyreScreen_Outer_F);
}
TyreScreen_Outer_F.close = function() {
};
TyreScreen_Outer_F.show = function() {
	console.log("show tyre outer front screen")
	TyreScreen.loadParts();
}

$(window).on("register-screens", TyreScreen_Outer_F.register);


// tyre inner front screen
let TyreScreen_Inner_F = {
	id : "tyre_inner_f"
};
TyreScreen_Inner_F.register = function() {
	UI.registerScreen(TyreScreen_Inner_F);
}
TyreScreen_Inner_F.close = function() {
};
TyreScreen_Inner_F.show = function() {
	console.log("show tyre inner front screen")
	TyreScreen.loadParts();
}

$(window).on("register-screens", TyreScreen_Inner_F.register);


// tyre middle front screen
let TyreScreen_Middle_F = {
	id : "tyre_middle_f"
};
TyreScreen_Middle_F.register = function() {
	UI.registerScreen(TyreScreen_Middle_F);
}
TyreScreen_Middle_F.close = function() {
};
TyreScreen_Middle_F.show = function() {
	console.log("show tyre middle front screen")
	TyreScreen.loadParts();
}

$(window).on("register-screens", TyreScreen_Middle_F.register);


// tyre outer rear screen
let TyreScreen_Outer_R = {
	id : "tyre_outer_r"
};
TyreScreen_Outer_R.register = function() {
	UI.registerScreen(TyreScreen_Outer_R);
}
TyreScreen_Outer_R.close = function() {
};
TyreScreen_Outer_R.show = function() {
	console.log("show tyre outer rear screen")
	TyreScreen.loadParts();
}

$(window).on("register-screens", TyreScreen_Outer_R.register);


// tyre inner rear screen
let TyreScreen_Inner_R = {
	id : "tyre_inner_r"
};
TyreScreen_Inner_R.register = function() {
	UI.registerScreen(TyreScreen_Inner_R);
}
TyreScreen_Inner_R.close = function() {
};
TyreScreen_Inner_R.show = function() {
	console.log("show tyre inner rear screen")
	TyreScreen.loadParts();
}

$(window).on("register-screens", TyreScreen_Inner_R.register);


// tyre middle rear screen
let TyreScreen_Middle_R = {
	id : "tyre_middle_r"
};
TyreScreen_Middle_R.register = function() {
	UI.registerScreen(TyreScreen_Middle_R);
}
TyreScreen_Middle_R.close = function() {
};
TyreScreen_Middle_R.show = function() {
	console.log("show tyre middle rear screen")
	TyreScreen.loadParts();
}

$(window).on("register-screens", TyreScreen_Middle_R.register);