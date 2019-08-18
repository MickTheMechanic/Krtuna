var APP_PREFIX = 'krtuna'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION

function removeDuplicates(arr){
	return arr.filter(function(item, pos) {
	    return arr.indexOf(item) == pos;
	});
}
//Add resources that should be available offline to this list.
let URLS = removeDuplicates([
	"/favicon.ico",
	"/krtuna/css/krtuna.css",
	"/krtuna/images/icon192.png",
	"/krtuna/images/tp-over.png",
	"/krtuna/images/tp-profile-2.png",
	"/krtuna/images/tp-profile-white.png",
	"/krtuna/images/tp-spanner-1.png",
	"/krtuna/images/tp-welcome.png",
	"/krtuna/index.html",
	"/krtuna/js/init.js",
	"/krtuna/js/jquery.min.js",
	"/krtuna/js/krtuna.js",
	"/krtuna/js/ui-lib.js",
	"/krtuna/js/version.js",
	"/krtuna/manifest.json",
	"/krtuna/screens/home/screen.css",
	"/krtuna/screens/home/screen.html",
	"/krtuna/screens/home/screen.js",
	"/krtuna/screens/oversteering/screen.css",
	"/krtuna/screens/oversteering/screen.html",
	"/krtuna/screens/oversteering/screen.js",
	"/krtuna/screens/profile/screen.css",
	"/krtuna/screens/profile/screen.html",
	"/krtuna/screens/profile/screen.js",
	"/krtuna/screens/tyres/screen.css",
	"/krtuna/screens/tyres/screen.html",
	"/krtuna/screens/tyres/screen.js",
	"/krtuna/screens/understeering/screen.css",
	"/krtuna/screens/understeering/screen.html",
	"/krtuna/screens/understeering/screen.js",
	"/krtuna/screens/welcome/screen.css",
	"/krtuna/screens/welcome/screen.html",
	"/krtuna/screens/welcome/screen.js",
	"/krtuna/service-worker.js"	]);

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.debug('SW_fetch','fetch request : ' + e.request.url)
  if (e.request.url.indexOf("__purge_cache")!=-1){
	  clearCache();
	  return;
  }
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.debug('SW','responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.warn('SW','file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.debug & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  console.log("listening for SW install");
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("SW",'installing cache : ' + CACHE_NAME);
      for (var i=0;i<URLS.length;i++){
    	  console.debug("SW","caching",URLS[i]);
    	  cache.add(URLS[i]);
      }
      return true;
    })
  )
})

self.addEventListener('activate', function (e) {
	  console.log("listening for SW activate");
  e.waitUntil(
    caches.keys().then(function (keyList) {
    	console.log("SW activated");
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.debug('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})

function clearCache(){
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        	console.log("SW","clearing",cacheName);
        	return true;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
}
