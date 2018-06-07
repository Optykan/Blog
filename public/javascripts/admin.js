"use strict";

$(function () {
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

	// -------------------------
	// --------- POSTS ---------
	// -------------------------
	function initialize_posts(editor, form) {
		var method = form.id.value === "" ? "POST" : "PUT";
		$("#save-post").click(function (e) {
			console.log(form);
			e.preventDefault();
			var url = null;
			if (method === "POST") {
				url = window.origin + '/api/posts';
			} else {
				url = window.origin + '/api/posts/' + form.id.value;
			}

			var opts = {
				method: method,
				body: JSON.stringify({
					idToken: userToken,
					title: form.title.value,
					subtitle: "",
					content: editor.value(),
					id: form.id.value
				}),
				credentials: 'same-origin',
				cache: "no-cache",
				headers: {
					'Content-Type': 'application/json'
				}
			};
			fetch(url, opts).then(function (response) {
				console.log("response", response);
			}).catch(function (e) {
				console.error(e);
				show_error(e.toString());
			});
		});
		$("#cancel-post").click(function (e) {
			window.location.href = window.origin + '/admin/posts';
			e.preventDefault();
		});
	}
	if (typeof simplemde !== "undefined" && typeof document.forms.post_form !== 'undefined') initialize_posts(simplemde, document.forms.post_form);
});