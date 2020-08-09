importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js"
);

const PRECACHE_RESOURCES = [
	{ url: "/", revision: "1" },
	{ url: "/css/materialize.min.css", revision: "1" },
	{ url: "/css/style.css", revision: "1" },
	{ url: "/fonts/Rancho-Regular.ttf", revision: "1" },
	{ url: "/images/icons/maskable-icon-96.png", revision: "1" },
	{ url: "/images/icons/maskable-icon-192.png", revision: "1" },
	{ url: "/images/icons/maskable-icon-512.png", revision: "1" },
	{ url: "/images/beranda.svg", revision: "1" },
	{ url: "/images/blank-badge.svg", revision: "1" },
	{ url: "/images/favicon.ico", revision: "1" },
	{ url: "/js/component/nav.js", revision: "1" },
	{ url: "/js/component/idb-tim.js", revision: "1" },
	{ url: "/js/materialize.min.js", revision: "1" },
	{ url: "/js/main.js", revision: "1" },
	{ url: "/js/api.js", revision: "1" },
	{ url: "/js/idb.js", revision: "1" },
	{ url: "/layouts/nav.html", revision: "1" },
	{ url: "/pages/beranda.html", revision: "1" },
	{ url: "/pages/tim.html", revision: "1" },
	{ url: "/pages/klasemen.html", revision: "1" },
	{ url: "/pages/favorit.html", revision: "1" },
	{ url: "/index.html", revision: "1" },
	{ url: "/manifest.json", revision: "1" },
];

workbox.precaching.precacheAndRoute(PRECACHE_RESOURCES, {
	// Ignore all URL parameters.
	ignoreURLParametersMatching: [/.*/],
});

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	new workbox.strategies.CacheFirst({
		cacheName: "piel-cache-images",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 30,
				maxEntries: 100,
			}),
		],
	})
);

workbox.routing.registerRoute(
	({ url }) => url.origin === "https://api.football-data.org",
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "piel-cache-api",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxAgeSeconds: 60 * 60,
			}),
		],
	})
);

workbox.routing.registerRoute(
	({ url }) => url.origin === "https://upload.wikimedia.org",
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "piel-cache-crest",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 30,
				maxEntries: 60,
			}),
		],
	})
);

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
