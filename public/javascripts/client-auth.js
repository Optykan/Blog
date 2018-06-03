"use strict";

(function () {
	var userToken = null;

	if (typeof firebase === 'undefined') {
		console.error("Could not find firebase");
		return;
	}
	function auth() {
		console.log("auth");
		var email = document.getElementById("login-email").value;
		var password = document.getElementById("login-password").value;
		firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
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
					'Content-Type': 'application/json',
					'X-Test-Header': "foo"
				}
			};
			fetch(url, opts).then(function (response) {
				console.log("auth success ", response);
				window.location.href = window.origin + "/admin";
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