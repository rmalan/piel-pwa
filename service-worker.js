const CACHE_NAME = "piel-pwa-v1";
let urlsToCache = [
	"/",
	"/src/css/materialize.min.css",
	"/src/css/style.css",
	"/src/fonts/Rancho-Regular.ttf",
	"/src/images/beranda.svg",
	"/src/images/favicon.ico",
	"/src/js/materialize.min.js",
	"/src/js/main.js",
	"/index.html",
	"/tim.html",
	"/klasemen.html",
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
