let dbPromised = idb.open("piel", 1, function (upgradeDb) {
	let teamsObjectStore = upgradeDb.createObjectStore("teams", {
		keyPath: "id",
	});
	teamsObjectStore.createIndex("name", "name", { unique: false });
});

function bookmarkTeam(id) {
	dbPromised
		.then(function (db) {
			let item = getTeam(id);
			item.then(function (team) {
				let tx = db.transaction("teams", "readwrite");
				let store = tx.objectStore("teams");

				store.put(team);

				return tx.complete;
			});
		})
		.then(function () {
			let favorite = document.getElementById("favorite-team-" + id);
			favorite.innerHTML = `
				<a class="btn-floating halfway-fab waves-effect waves-light red accent-3 saved" onclick="unbookmarkTeam(${id})">
					<i class="material-icons">bookmark</i>
				</a>
			`;

			M.toast({
				html: "Tim telah ditambahkan ke favorit",
				classes: "rounded",
			});
		})
		.catch(function (error) {
			console.log(error);
			M.toast({
				html: "Tim gagal ditambahkan ke favorit",
				classes: "rounded",
			});
		});
}

function unbookmarkTeam(id) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("teams", "readwrite");
			let store = tx.objectStore("teams");
			store.delete(id);
			return tx.complete;
		})
		.then(function () {
			let favorite = document.getElementById("favorite-team-" + id);
			favorite.innerHTML = `
				<a class="btn-floating halfway-fab waves-effect waves-light red accent-3 saved" onclick="bookmarkTeam(${id})">
					<i class="material-icons">bookmark_border</i>
				</a>
			`;

			M.toast({
				html: "Tim dihapus dari favorit",
				classes: "rounded",
			});
		})
		.catch(function (error) {
			console.log(error);
			M.toast({
				html: "Tim gagal dihapus dari favorit",
				classes: "rounded",
			});
		});
}

function checkFavoriteTeam(id) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("teams", "readonly");
			let store = tx.objectStore("teams");

			return store.get(id);
		})
		.then(function (val) {
			if (val != null && val.id == id) {
				if (val.id == id) {
					let favorite = document.getElementById(
						"favorite-team-" + id
					);
					favorite.innerHTML = `
						<a class="btn-floating halfway-fab waves-effect waves-light red accent-3 saved" onclick="unbookmarkTeam(${id})">
							<i class="material-icons">bookmark</i>
						</a>
					`;
				}
			}
		});
}

function getAll() {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				let tx = db.transaction("teams", "readonly");
				let store = tx.objectStore("teams");
				return store.getAll();
			})
			.then(function (teams) {
				resolve(teams);
			});
	});
}

function getFavoritesTeam() {
	getAll().then(function (data) {
		let teams = "";
		if (data.length != 0) {
			data.forEach((team) => {
				teams += `
					<div class="col s12 m6 l4">
						<div class="card">
							<div class="card-image team--logo valign-wrapper">
								<img src="${team.crestUrl}" alt="Badge ${team.name}" />
								<a class="btn-floating halfway-fab waves-effect waves-light red accent-3 saved" onclick="removeFaviriteTeam(${team.id})">
									<i class="material-icons">bookmark</i>
								</a>
							</div>
							<div class="card-content team--content">
								<a href="${team.website}" class="card-title blue-text truncate" target="_blank" >${team.name}</a>
								<p class="">${team.venue}</p>
							</div>
						</div>
					</div>
				`;
			});
		} else {
			teams += `<div class="col s12 center-align">Tidak ada favorit</div>`;
		}

		document.getElementById("pl-favorites-team").innerHTML = teams;
	});
}

function removeFaviriteTeam(id) {
	dbPromised
		.then(function (db) {
			let tx = db.transaction("teams", "readwrite");
			let store = tx.objectStore("teams");
			store.delete(id);
			return tx.complete;
		})
		.then(function () {
			M.toast({
				html: "Tim dihapus dari favorit",
				classes: "rounded",
			});
			getFavoritesTeam();
		})
		.catch(function (error) {
			console.log(error);
			M.toast({
				html: "Tim gagal dihapus dari favorit",
				classes: "rounded",
			});
		});
}
