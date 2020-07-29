let base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
	if (response.status !== 200) {
		console.log("Error : " + response.status);

		// Method reject() akan membuat blok catch terpanggil
		return Promise.reject(new Error(response.statusText));
	} else {
		// Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
		return Promise.resolve(response);
	}
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
	return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
	// Parameter error berasal dari Promise.reject()
	console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
	let request = new Request(base_url + "competitions/2021/teams", {
		method: "GET",
		headers: new Headers({
			"X-Auth-Token": "f93b4249e66a4297bf2fd1af2a8d7e6a",
		}),
	});

	if ("caches" in window) {
		caches.match(request).then(function (response) {
			if (response) {
				response.json().then(function (data) {
					// Menyusun komponen tim
					let teams = "";
					data.teams.forEach((team) => {
						teams += `
							<div class="col s12 m6 l4">
								<div class="card">
									<div class="card-image team--logo valign-wrapper">
										<img src="${team.crestUrl}" />
										<a class="btn-floating halfway-fab waves-effect waves-light red accent-3 saved">
											<i class="material-icons">bookmark_border</i>
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
					// Sisipkan komponen tim ke dalam elemen dengan id #pl-teams
					document.getElementById("pl-teams").innerHTML = teams;

					// Menghilangkan preload
					document.getElementById("preload").innerHTML = "";
				});
			}
		});
	}

	fetch(request)
		.then(status)
		.then(json)
		.then(function (data) {
			// Menyusun komponen tim
			let teams = "";
			data.teams.forEach((team) => {
				teams += `
                    <div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image team--logo valign-wrapper">
                                <img src="${team.crestUrl}" />
                                <a class="btn-floating halfway-fab waves-effect waves-light red accent-3 saved">
                                    <i class="material-icons">bookmark_border</i>
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
			// Sisipkan komponen tim ke dalam elemen dengan id #pl-teams
			document.getElementById("pl-teams").innerHTML = teams;

			// Menghilangkan preload
			document.getElementById("preload").innerHTML = "";
		})
		.catch(error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
	let request = new Request(base_url + "competitions/2021/standings", {
		method: "GET",
		headers: new Headers({
			"X-Auth-Token": "f93b4249e66a4297bf2fd1af2a8d7e6a",
		}),
	});

	if ("caches" in window) {
		caches.match(request).then(function (response) {
			if (response) {
				response.json().then(function (data) {
					// Menyusun komponen klasemen
					let standings = "";
					data.standings[0].table.forEach((standing) => {
						standings += `
							<tr>
								<td>${standing.position}</td>
								<td><img src="${standing.team.crestUrl}" class="badge" alt="Badge ${standing.team.name}" /></td>
								<td>${standing.team.name}</td>
								<td>${standing.playedGames}</td>
								<td>${standing.won}</td>
								<td>${standing.draw}</td>
								<td>${standing.lost}</td>
								<td>${standing.goalsFor}</td>
								<td>${standing.goalsAgainst}</td>
								<td>${standing.goalDifference}</td>
								<td>${standing.points}</td>
							</tr>
						`;
					});
					// Menampilkan tabel klasemen
					document
						.querySelector("#standings-table")
						.classList.remove("hide");

					// Sisipkan komponen klasemen ke dalam elemen dengan id #pl-standings
					document.getElementById(
						"pl-standings"
					).innerHTML = standings;

					// Menghilangkan preload
					document.getElementById("preload").innerHTML = "";
				});
			}
		});
	}

	fetch(request)
		.then(status)
		.then(json)
		.then(function (data) {
			// Menyusun komponen klasemen
			let standings = "";
			data.standings[0].table.forEach((standing) => {
				standings += `
					<tr>
						<td>${standing.position}</td>
						<td><img src="${standing.team.crestUrl}" class="badge" alt="Badge ${standing.team.name}" /></td>
						<td>${standing.team.name}</td>
						<td>${standing.playedGames}</td>
						<td>${standing.won}</td>
						<td>${standing.draw}</td>
						<td>${standing.lost}</td>
						<td>${standing.goalsFor}</td>
						<td>${standing.goalsAgainst}</td>
						<td>${standing.goalDifference}</td>
						<td>${standing.points}</td>
					</tr>
				`;
			});
			// Menampilkan tabel klasemen
			document.querySelector("#standings-table").classList.remove("hide");

			// Sisipkan komponen klasemen ke dalam elemen dengan id #pl-standings
			document.getElementById("pl-standings").innerHTML = standings;

			// Menghilangkan preload
			document.getElementById("preload").innerHTML = "";
		})
		.catch(error);
}
