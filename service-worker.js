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
	"/css/krtuna.css",
	"/images/icon192.png",
	"/images/tp-over.png",
	"/images/tp-profile-2.png",
	"/images/tp-profile-white.png",
	"/images/tp-spanner-1.png",
	"/images/tp-welcome.png",
	"/index.html",
	"/js/init.js",
	"/js/jquery.min.js",
	"/js/krtuna.js",
	"/js/ui-lib.js",
	"/js/version.js",
	"/manifest.json",
	"/screens/home/screen.css",
	"/screens/home/screen.html",
	"/screens/home/screen.js",
	"/screens/oversteering/screen.css",
	"/screens/oversteering/screen.html",
	"/screens/oversteering/screen.js",
	"/screens/profile/screen.css",
	"/screens/profile/screen.html",
	"/screens/profile/screen.js",
	"/screens/tyres/screen.css",
	"/screens/tyres/screen.html",
	"/screens/tyres/screen.js",
	"/screens/understeering/screen.css",
	"/screens/understeering/screen.html",
	"/screens/understeering/screen.js",
	"/screens/welcome/screen.css",
	"/screens/welcome/screen.html",
	"/screens/welcome/screen.js",
	"/service-worker.js"	]);

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
