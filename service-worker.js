const CACHE_NAME = "piel-pwa-v1";
let urlsToCache = [
	"/",
	"/css/materialize.min.css",
	"/css/style.css",
	"/fonts/Rancho-Regular.ttf",
	"/images/icons/maskable-icon-96.png",
	"/images/icons/maskable-icon-192.png",
	"/images/icons/maskable-icon-512.png",
	"/images/beranda.svg",
	"/images/favicon.ico",
	"/js/component/nav.js",
	"/js/component/idb-tim.js",
	"/js/materialize.min.js",
	"/js/main.js",
	"/js/api.js",
	"/js/idb.js",
	"/layouts/nav.html",
	"/pages/beranda.html",
	"/pages/tim.html",
	"/pages/klasemen.html",
	"pages/favorit.html",
	"/index.html",
	"/manifest.json",
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function (event) {
	let base_url = "https://api.football-data.org/v2/";

	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache) {
				return fetch(event.request).then(function (response) {
					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request).then(function (response) {
				return response || fetch(event.request);
			})
		);
	}
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("push", function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = "Push message no payload";
	}
	let options = {
		body: body,
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification("Push Notification", options)
	);
});
