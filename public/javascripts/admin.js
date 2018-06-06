"use strict";

(function () {
	$(document).foundation();

	function show_alert(title, message, className) {
		$("#alert-message").text(message);
		$("#alert").show();
		document.getElementById("alert").className = "callout " + className;
	}

	function show_error(message) {
		show_alert('Error', message, 'alert');
	}

	$("#logout").click(function (e) {
		document.getElementById("logout").querySelector("i").className = "ion ion-load-c ion-spin-animation";
		firebase.auth().signOut().then(function () {
			window.location.href = window.origin + "/admin/logout";
		}).catch(function (e) {
			show_error("Signout failed");
		});
	});

	$("#save-post").click(function (e) {
		e.preventDefault();
		var url = window.origin + '/api/posts/' + Date.now();
		var opts = {
			method: "POST",
			body: JSON.stringify({
				idToken: userToken
			}),
			credentials: 'same-origin',
			cache: "no-cache",
			headers: {
				'Content-Type': 'application/json'
			}
		};
		fetch(url, opts).then(function (response) {
			console.log(response);
		}).catch(function (e) {
			show_error(e);
		});
	});
	$("#cancel-post").click(function (e) {
		window.location.href = window.origin + '/admin/posts';
		e.preventDefault();
	});
})();