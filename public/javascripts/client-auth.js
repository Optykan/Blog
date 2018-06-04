"use strict";

(function () {
	var userToken = null;

	if (typeof firebase === 'undefined') {
		console.error("Could not find firebase");
		return;
	}
	function auth() {
		document.getElementById("login-button").querySelector("i").className = "ion ion-load-c ion-spin-animation";
		var email = document.getElementById("login-email").value;
		var password = document.getElementById("login-password").value;
		firebase.auth().signInWithEmailAndPassword(email, password).then(function (userWrapper) {

			userWrapper.user.getIdToken().then(function (token) {
				userToken = token;

				var url = window.location.origin + "/api/verify-token";
				var body = {
					idToken: userToken
				};
				var opts = {
					method: "POST",
					body: JSON.stringify(body),
					credentials: 'same-origin',
					cache: "no-cache",
					headers: {
						'Content-Type': 'application/json'
					}
				};
				fetch(url, opts).then(function (response) {
					console.log("auth success ", response);
					window.location.href = window.origin + "/admin";
				}).catch(function (e) {
					console.error(e);
				});
			});
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			console.error(errorCode, errorMessage);
		});
	}

	document.getElementById("login-button").onclick = auth;

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			user.getIdToken().then(function (token) {
				console.log("retrieved token");
				userToken = token;
			});
		} else {
			console.log("not logged in");
		}
	});
})();