'use strict';

importScripts('./cache-polyfill.js');

var version = 'v1::';

self.addEventListener('install', function(e) {
	e.waitUntil(
	    caches.open(`${version}ascaliko`).then(function(cache) {
			return cache.addAll([
				'/',
				'../index.html', 
				'../page/home/home.html', 
				'../page/about/about.html', 
				'../page/blog/post.html', 
				'../page/youtube/youtube.html', 
				'../manifest.json',
				'../images/favicon.png',
				'../css/fonts/alice-v11-latin-regular.eot',
				'../css/fonts/alice-v11-latin-regular.woff2',
				'../css/fonts/alice-v11-latin-regular.woff',
				'../css/fonts/alice-v11-latin-regular.ttf',
				'../css/fonts/alice-v11-latin-regular.svg#Alice',
				'../css/fonts.css',
				'../css/normalize.css',
				'../css/skeleton.css',
				'../css/ascaliko.css',
				'../js/jquery-3.4.1.min.js',
				'../js/main.js',
			]);
	    }).then(function() {
			console.log('WORKER 👷: install completed');
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
/*self.addEventListener('message', function(e) {
  self.postMessage(e.data);
}, false);
*/
/*self.addEventListener('install', (event) => {
    console.log('👷', 'install', event);
});

self.addEventListener('activate', (event) => {
  console.log('👷', 'activate', event);
  return self.clients.claim();
});*/

/*self.addEventListener('fetch', function(event) {
  // console.log('👷', 'fetch', event);
  event.respondWith(fetch(event.request));
});*/