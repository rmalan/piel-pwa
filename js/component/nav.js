document.addEventListener("DOMContentLoaded", function () {
	let elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);

	loadNav();

	let page = window.location.hash.substr(1);
	if (page == "") page = "beranda";
	loadPage(page);

	function loadNav() {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				document
					.querySelectorAll(".topnav, .sidenav")
					.forEach(function (elm) {
						elm.innerHTML = xhttp.responseText;
					});

				document
					.querySelectorAll(".sidenav a, .topnav a")
					.forEach(function (elm) {
						elm.addEventListener("click", function (event) {
							let sidenav = document.querySelector(".sidenav");
							M.Sidenav.getInstance(sidenav).close();

							page = event.target.getAttribute("href").substr(1);
							loadPage(page);
						});
					});
			}
		};
		xhttp.open("GET", "layouts/nav.html", true);
		xhttp.send();
	}

	function loadPage(page) {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				let content = document.querySelector("#body-content");

				if (page == "tim") {
					getTeams();
				} else if (page == "klasemen") {
					getStandings();
				} else if (page == "favorit") {
					getFavoritesTeam();
				}

				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if (this.status == 404) {
					content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
				} else {
					content.innerHTML =
						"<p>Ups.. halaman tidak dapat diakses.</p>";
				}
			}
		};
		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}
});
