"use strict";

$(function () {
	$(document).foundation();

	function show_alert(title, message, className) {
		document.getElementById("alert-message").innerHTML = message;
		document.getElementById("alert-title").innerHTML = title;
		document.getElementById("alert").className = "callout " + className;
		$("#alert").addClass("alert-showing");
		setTimeout(function () {
			$("#alert").removeClass("alert-showing");
		}, 5000);
	}

	function show_error(message) {
		show_alert('Error', message, 'alert');
	}

	function show_success(message) {
		show_alert('Success', message, 'success');
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
			e.stopImmediatePropagation();
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
					id: form.id.value,
					image: form.image.value || 'http://placehold.it/350x350'
				}),
				credentials: 'same-origin',
				cache: "no-cache",
				headers: {
					'Content-Type': 'application/json'
				}
			};
			fetch(url, opts).then(function (response) {
				return response.json();
			}).then(function (response) {
				if (response.status === 200) {
					show_success(response.message);
					window.location.href = window.origin + '/admin/posts';
				} else {
					throw new Error(response.message);
				}
			}).catch(function (e) {
				console.error(e);
				show_error(e.toString());
			});
		});
		$("#delete-post").click(function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			var url = window.origin + '/api/posts/' + form.id.value;
			var opts = {
				method: "DELETE",
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
				return response.json();
			}).then(function (response) {
				if (response.status === 200) {
					show_success(response.message);
					window.location.href = window.location.href = window.origin + '/admin/posts';
				} else {
					show_error(response.message);
				}
			}).catch(function (e) {
				show_error(e.toString());
				console.error(e);
			});
		});
		$("#cancel-post").click(function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			window.location.href = window.origin + '/admin/posts';
		});
	}
	if (typeof simplemde !== "undefined" && typeof document.forms.post_form !== 'undefined') initialize_posts(simplemde, document.forms.post_form);
});