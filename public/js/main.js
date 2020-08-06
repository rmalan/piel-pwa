// Periksa service worker
if (!("serviceWorker" in navigator)) {
	console.log("Service worker tidak didukung browser ini.");
} else {
	registerServiceWorker();
	requestPermission();
}

function registerServiceWorker() {
	return navigator.serviceWorker
		.register("./service-worker.js")
		.then(function (registration) {
			console.log("Registrasi service worker berhasil.");
			return registration;
		})
		.catch(function (err) {
			console.error("Registrasi service worker gagal.", err);
		});
}

function requestPermission() {
	if ("Notification" in window) {
		Notification.requestPermission().then(function (result) {
			if (result === "denied") {
				console.log("Fitur notifikasi tidak diizinkan.");
				return;
			} else if (result === "default") {
				console.error("Pengguna menutup kotak dialog permintaan izin.");
				return;
			}

			navigator.serviceWorker.ready.then(() => {
				if ("PushManager" in window) {
					navigator.serviceWorker
						.getRegistration()
						.then(function (registration) {
							registration.pushManager
								.subscribe({
									userVisibleOnly: true,
									applicationServerKey: urlBase64ToUint8Array(
										"BLxSWatJjTFjXOAne-W_58p1iJmrhiaUQL8tmAoPyahMXMxq1I9tT44MyQ-NcpysQQpkEyC9rcV_FFt6HmoTy6M"
									),
								})
								.then(function (subscribe) {
									console.log("Berhasil melakukan subscribe");
								})
								.catch(function (e) {
									console.error(
										"Tidak dapat melakukan subscribe "
									);
								});
						});
				}
			});
		});
	}
}

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+")
		.replace(/_/g, "/");
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
