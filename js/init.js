var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e){
  console.log("++++++++++++beforeinstallprompt");
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  $("#install_app_prompt").css("display", 'block');
});

App.initialize=function(){
	
	function loadScreens(){
		console.debug("Loading screens HTML")
		App.loadTracking();
		loadResources({
			scriptsLoaded:0,
			urls: [
				"screens/home/screen.html", "screens/profile/screen.html",
				"screens/understeering/screen.html", "screens/oversteering/screen.html", "screens/welcome/screen.html", "screens/tyres/screen.html"],
			dataType:"text",
			allLoadedCallback:function(){
				console.log("Firing initialize event")
				$(window).trigger("initialize");
				$("body").removeClass("loading");
				$(window).trigger("app-loaded");
			},
			callback:function(url,data){
				$(".screens").append($(data));
			}
		});
	}
	
	console.log("Loading javascript libraries")
	loadResources({
		scriptsLoaded:0,
		urls: ["js/ui-lib.js", "js/krtuna.js",
			"screens/home/screen.js", "screens/profile/screen.js",
			"screens/understeering/screen.js", "screens/oversteering/screen.js", "screens/welcome/screen.js", "screens/tyres/screen.js"],
		dataType:"script",
		allLoadedCallback:function(){
			console.log("initialising application");
			loadScreens();
			registerServiceWorker();
			App.checkForUpdates();
		},
		callback:function(url,data){
			  console.debug("loaded "+url);
			  this.scriptsLoaded++;
		}
	});
}


App.hideInstallPrompt=function(){
	$("#install_app_prompt").css("display","none");
}

App.installApp=function(){
	  // hide our user interface that shows our A2HS button
	  App.hideInstallPrompt();
	  // Show the prompt
	  deferredPrompt.prompt();
	  // Wait for the user to respond to the prompt
	  deferredPrompt.userChoice
	    .then((choiceResult) => {
	      if (choiceResult.outcome === 'accepted') {
	        console.log('User accepted the A2HS prompt');
	      } else {
	        console.log('User dismissed the A2HS prompt');
	      }
	      deferredPrompt = null;
	    });
};

function loadResources(config){
	var resourcesLoaded = 0;
	for (var i=0;i<config.urls.length;i++){
		var url = config.urls[i];
		console.debug("Fetching "+url);
		$.ajax({
			  url: url,
			  dataType: config.dataType,
			  success: function(data){
				  config.callback(url,data);
				  resourcesLoaded++;
				  if (resourcesLoaded == config.urls.length)
					  (config.allLoadedCallback||Function)();
			  }
		});
	}
}

App.loadTracking=function(){
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'UA-71747779-4');
}

App.checkForUpdates=function(){
	console.log("Checking for new version");
	$.ajax({
		  dataType: "json",
		  url: "/krtuna/js/version.js",
		  success: function(data){
			  var version = localStorage.getItem("version");
			  if (!version){ // version not stored yet, just take server version and stop
				  localStorage.setItem("version", data.version);
				  version = data.version;
			  }
			  console.log("Installed version is", version);
			  console.log("Newest version on server is",data.version);
			  if (data.version!=version){
				  //firefox doesn't show confirmation/alerts in RD mode
				  var installNow = window.confirm("A new version is available. Install now?");
				  if (installNow){
					  App.update();
					  localStorage.setItem("version", data.version);
				  }
			  }
		  }
		});
}

App.update=function(){
	UI.defer(function(){
		App.serviceWorkerRegistration.update();
		window.location.reload();
	});
	$.ajax({
		  url: "__purge_cache" //service worker catches the URL and clears cache
	});
}

App.smokeScreenClicked=function(){
	console.log("smoke screen clicked")
	AppMenu.hide();
}

function registerServiceWorker(){
	if ('serviceWorker' in navigator) {
			console.log("registering service worker...");
		  navigator.serviceWorker.register('/krtuna/service-worker.js', {scope: '/krtuna/'})
		  .then(function(reg) {
			App.serviceWorkerRegistration=reg;
		    // registration worked
		    console.log('Registration succeeded. Scope is ' + reg.scope);
		  }).catch(function(error) {
		    // registration failed
		    console.log('Registration failed with ' + error);
		  });
		}
}
// loading scripts via ajax because github doesn't serve them with javascript
// HTTP header
