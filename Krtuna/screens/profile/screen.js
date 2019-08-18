
let ProfileScreen={ id:"profile"};

ProfileScreen.register=function(){
	UI.registerScreen(ProfileScreen);
}

var CSS_RULES_ADDED = false;
ProfileScreen.getProfile=function(){
	var profile = localStorage.getItem("profile");
	if (profile)
		profile = JSON.parse(profile);
	if (!profile){
		//lazy way to get profile with all properties
		profile = ProfileScreen.readProfileFromScreen()
		//requested by mick that toe_front always be available
		profile.toe_front=true;
	}
	console.log("loaded profile",profile);
	
	if (!CSS_RULES_ADDED){
		for ( var property in profile) {
			if (profile.hasOwnProperty(property)) {
				UI.addCssRule(".has_"+property+" .needs_"+property+" {display:block}");
			}
		}
		CSS_RULES_ADDED=true;
	}
	ProfileScreen.loadCssDiscriminators(profile);
	return profile;
}

ProfileScreen.loadCssDiscriminators=function(profile){
	let body = $("body");
	var parts = 0;
	for ( var property in profile) {
		if (profile.hasOwnProperty(property)) {
			body.removeClass("has_"+property);
			if (profile[property]){
				body.addClass("has_"+property);
				parts++;
			}
		}
	}
	//we know that at least 'toe front' is present, thus an empty profile has at least 1 part
	let isEmpty = parts < 2;
	body.removeClass("empty-profile");
	if (isEmpty)
		body.addClass("empty-profile");
	console.log("profile is empty?",isEmpty);
}

ProfileScreen.storeProfile=function(profile){
	console.log("storing profile",profile);
	localStorage.setItem("profile", JSON.stringify(profile));
	ProfileScreen.loadCssDiscriminators(profile);
}

ProfileScreen.readProfileFromScreen=function(){
	let profile={};
	$("#profile categories .part-row").each(function(i,e){
		let eInput = $(e);
		let id = eInput.attr("id");
		let checked = eInput.hasClass("enabled");
		profile[id]=checked;
	});
	return profile;
}
ProfileScreen.persistForm=function(){
	let profile = ProfileScreen.readProfileFromScreen();
	ProfileScreen.storeProfile(profile);
}

ProfileScreen.close=function(){
	ProfileScreen.persistForm();
};

ProfileScreen.toggleCategory=function(element){
	let e = $(element);
	let isActive = e.hasClass("active");
	e.removeClass("active");
	if (!isActive)
		e.addClass("active");
}


ProfileScreen.categoryButtonClicked=function(button){
	let eCollapsible = $(button).parents(".collapsible");
	console.log(eCollapsible);
	ProfileScreen.toggleCategory(eCollapsible);
}
ProfileScreen.partToggled=function(e){
	let eDiv = $(e);
	if (eDiv.hasClass("enabled"))
		eDiv.removeClass("enabled");
	else eDiv.addClass("enabled");
	ProfileScreen.persistForm();
}

ProfileScreen.loadProfileIntoScreen=function(){
	let profile = ProfileScreen.getProfile();
	$("#profile category .part-row").each(function(i,e){
		let eInput=$(e);
		let id = eInput.attr("id");
		if (profile[id])
			eInput.addClass("enabled");
	});
}

ProfileScreen.decorateDOM=function(){
	if ($("#profile").attr("decorated"))
		return;
	$("#profile").attr("decorated",true);
	console.log("Decorating static DOM");
	$("#profile categories category").each(function(i,e){
		let eCategory=$(e);
		let eCollapsible = $("<div class=collapsible></div>");
		let eButton = $("<button>"+eCategory.attr("label")+"</button>");
		eButton.on("click",function(){ProfileScreen.categoryButtonClicked(eButton)});
		eCollapsible.append(eButton);
		let eItems = $("<div class=items></div>");
		eCollapsible.append(eItems);
		eCategory.find("part").each(function(i,e){
			let ePart = $(e);
			let eSwitch = $("<div id='"+ePart.attr("data-id")+"' class=part-row onclick='ProfileScreen.partToggled(this)'><div class=part-icon></div><div class=label>"+ePart.attr("label")+"</div></div>");
			eItems.append(eSwitch);
		});
		eCategory.append(eCollapsible);
	});
}

ProfileScreen.show=function(){
	ProfileScreen.decorateDOM();
	ProfileScreen.loadProfileIntoScreen();
}
$(window).on("register-screens", ProfileScreen.register);
$(window).on("app-loaded", ProfileScreen.getProfile); // decorates CSS on app startup
