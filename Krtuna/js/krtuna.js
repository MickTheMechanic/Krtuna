let Tools = {};

Tools.findById=function(id,array){
	console.log("findById(",id,array,")")
	for (var i=0;i<array.length;i++)
		if (array[i].id==id)
			return array[i];
	return null;
}

let AppMenu={};

AppMenu.toggle=function(event){
	console.log("toggle")
	let eAppMenu = $("body");
	var isExpanded = eAppMenu.hasClass("app-menu-expanded");
	if (isExpanded)
		eAppMenu.removeClass("app-menu-expanded");
	else eAppMenu.addClass("app-menu-expanded");
	event.stopPropagation();
}

AppMenu.hide=function(){
	let eAppMenu = $("body");
	eAppMenu.removeClass("app-menu-expanded");
}
