const CACHE_NAME = "piel-pwa-v1";
let urlsToCache = [
	"/",
	"/css/materialize.min.css",
	"/css/style.css",
	"/fonts/Rancho-Regular.ttf",
	"/images/beranda.svg",
	"/images/favicon.ico",
	"/js/component/nav.js",
	"/js/materialize.min.js",
	"/js/main.js",
	"/layouts/nav.html",
	"/pages/beranda.html",
	"/pages/tim.html",
	"/pages/klasemen.html",
	"/index.html",
];

self.addEventListener("install", function (event) {
	console.log("ServiceWorker: Menginstall..");

	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log("ServiceWorker: Membuka cache..");
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			console.log("ServiceWorker: Menarik data: ", event.request.url);

			if (response) {
				console.log(
					"ServiceWorker: Gunakan aset dari cache: ",
					response.url
				);
				return response;
			}

			console.log(
				"ServiceWorker: Memuat aset dari server: ",
				event.request.url
			);
			return fetch(event.request);
		})
	);
});
