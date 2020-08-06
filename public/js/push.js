let webPush = require("web-push");

const vapidKeys = {
	publicKey:
		"BLxSWatJjTFjXOAne-W_58p1iJmrhiaUQL8tmAoPyahMXMxq1I9tT44MyQ-NcpysQQpkEyC9rcV_FFt6HmoTy6M",
	privateKey: "9CLOl8wprrSfj_NRlAMvGSBRlnM6VNhhOe8ABIXNRdY",
};

webPush.setVapidDetails(
	"mailto:example@yourdomain.org",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);
let pushSubscription = {
	endpoint:
		"https://sg2p.notify.windows.com/w/?token=BQYAAAByb5aAzU4HMfNmXmtd2BYpwGfspzRE4I7UjxqSoLBFg%2blPRyNkOyzreTfeeVaCMoXNvmG%2fArPBJ2cNKYW3syFir%2fMLVSOomsw56XJZlKL2kxc7xbSRnynjkch2FIiSWYJcQGtVsuHtI9uy2FLgtMS5soTWlj%2bQH3Tv7dDN5kEF0yjoSpirlKM2nycTOy5HizcgG0UmDEZByk5Y539LlhoW2xyi4qBkPbyOv0vSdWc6ZXrOMFI7KGzt%2fVIegMV7lW7xkKv8kRubVOaa%2bBl3TlbiifUefu0M2GecooAdNeocRykHLNNW4Mf4GbdLxo3XhHY%3d",
	keys: {
		p256dh:
			"BLjZtb5dhrSFjaXQ74Zyjj+r4Qno4k9921A7DVw2dEHQeW1Nm6nu9Z+67Qgb6CmrwLEdN8hqiYm/Aq4WcUepcEs=",
		auth: "5uPXBbzLK20TPbEw60jlwg==",
	},
};
let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

let options = {
	gcmAPIKey: "1018410470818",
	TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
