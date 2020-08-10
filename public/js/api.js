let base_url = "https://api.football-data.org/v2/";

function status(response) {
	if (response.status !== 200) {
		console.log("Error : " + response.status);

		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log("Error : " + error);
}

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
					setTeams(data);
				});
			}
		});
	}

	fetch(request)
		.then(status)
		.then(json)
		.then(function (data) {
			setTeams(data);
		})
		.catch(error);
}

function setTeams(data) {
	let teams = "";
	data.teams.forEach((team) => {
		teams += `
			<div class="col s12 m6 l4">
				<div class="card">
					<div class="card-image team--logo valign-wrapper">
						<img src="${team.crestUrl}" alt="Badge ${team.name}" onerror="this.src='images/blank-badge.svg'" />
						<div id="favorite-team-${team.id}">
							<a class="btn-floating halfway-fab waves-effect waves-light red accent-3" onclick="bookmarkTeam(${team.id})">
								<i class="material-icons">bookmark_border</i>
							</a>
						</div>
					</div>
					<div class="card-content team--content">
						<a href="${team.website}" class="card-title blue-text truncate" target="_blank" >${team.name}</a>
						<p class="">${team.venue}</p>
					</div>
				</div>
			</div>
		`;
		checkFavoriteTeam(team.id);
	});

	document.getElementById("pl-teams").innerHTML = teams;
	document.getElementById("preload").innerHTML = "";
}

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
					setStandings(data);
				});
			}
		});
	}

	fetch(request)
		.then(status)
		.then(json)
		.then(function (data) {
			setStandings(data);
		})
		.catch(error);
}

function setStandings(data) {
	let standings = "";
	data.standings[0].table.forEach((standing) => {
		standings += `
			<tr>
				<td>${standing.position}</td>
				<td><img src="${standing.team.crestUrl}" class="badge" alt="Badge ${standing.team.name}" onerror="this.src='images/blank-badge.svg'" /></td>
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

	document.querySelector("#standings-table").classList.remove("hide");
	document.getElementById("pl-standings").innerHTML = standings;
	document.getElementById("preload").innerHTML = "";
}

function getTeam(id) {
	return new Promise(function (resolve, reject) {
		let request = new Request(base_url + "teams/" + id, {
			method: "GET",
			headers: new Headers({
				"X-Auth-Token": "f93b4249e66a4297bf2fd1af2a8d7e6a",
			}),
		});

		fetch(request)
			.then(status)
			.then(json)
			.then(function (data) {
				let tim = {
					id: data.id,
					name: data.name,
					crestUrl: data.crestUrl,
					website: data.website,
					venue: data.venue,
				};

				resolve(tim);
			});
	});
}
