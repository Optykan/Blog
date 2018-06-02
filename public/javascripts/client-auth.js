"use strict";

(function () {
	if (typeof firebase === 'undefined') {
		console.error("Could not find firebase");
		return;
	}
	function auth() {
		console.log("auth");
		var email = document.getElementById("login-email").value;
		var password = document.getElementById("login-password").value;
		firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
			console.log("auth success");
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
				console.log("token ", token);
			});
		} else {
			console.log("not logged in");
		}
	});
})();