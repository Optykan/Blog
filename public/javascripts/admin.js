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

	// --------------------------
	// --------- EDITOR ---------
	// --------------------------
	function initialize_editor(editor, form, endpoint, redirect, buttons) {
		var method = form.id.value === "" ? "POST" : "PUT";
		buttons.save.$element.click(function (e) {
			document.getElementById(buttons.save.id).querySelector("i").className = "ion ion-load-c ion-spin-animation";
			console.log(e);
			e.preventDefault();
			e.stopImmediatePropagation();
			var url = null;
			if (method === "POST") {
				url = window.origin + '/api/' + endpoint;
			} else {
				url = window.origin + '/api/' + endpoint + '/' + form.id.value;
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
					window.location.href = window.origin + redirect;
				} else {
					throw new Error(response.message);
				}
			}).catch(function (e) {
				console.error(e);
				show_error(e.toString());
			});
		});
		buttons.delete.$element.click(function (e) {
			document.getElementById(buttons.delete.id).querySelector("i").className = "ion ion-load-c ion-spin-animation";
			e.preventDefault();
			e.stopImmediatePropagation();
			var url = window.origin + '/api/' + endpoint + '/' + form.id.value;
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
					window.location.href = window.location.href = window.origin + redirect;
				} else {
					show_error(response.message);
					document.getElementById(buttons.delete.id).querySelector("i").className = "ion ion-close";
				}
			}).catch(function (e) {
				show_error(e.toString());
				console.error(e);
				document.getElementById(buttons.delete.id).querySelector("i").className = "ion ion-close";
			});
		});
		buttons.cancel.$element.click(function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			window.location.href = window.origin + redirect;
		});
	}
	if (typeof simplemde !== "undefined" && typeof document.forms.post_form !== 'undefined') {
		var buttons = {
			save: {
				id: 'save-post',
				$element: $("#save-post")
			},
			delete: {
				id: 'delete-post',
				$element: $("#delete-post")
			},
			cancel: {
				id: 'cancel-post',
				$element: $("#cancel-post")
			}
		};
		initialize_editor(simplemde, document.forms.post_form, 'posts', '/admin/posts', buttons);
	}

	if (typeof simplemde !== "undefined" && typeof document.forms.project_form !== "undefined") {
		var _buttons = {
			save: {
				id: 'save-project',
				$element: $('#save-project')
			},
			delete: {
				id: 'delete-project',
				$element: $('#delete-project')
			},
			cancel: {
				id: 'cancel-project',
				$element: $('#cancel-project')
			}
		};
		initialize_editor(simplemde, document.forms.project_form, 'projects', '/admin/projects', _buttons);
	}
});