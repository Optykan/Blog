$(function(){
	$(document).foundation();

	function show_alert(title, message, className){
		document.getElementById("alert-message").innerHTML = message; 
		document.getElementById("alert-title").innerHTML = title;
		document.getElementById("alert").className = "callout "+className;
		$("#alert").addClass("alert-showing");
		setTimeout(()=>{
			$("#alert").removeClass("alert-showing")
		}, 5000)
	}

	function show_error(message){
		show_alert('Error', message, 'alert')
	}

	function show_success(message){
		show_alert('Success', message, 'success')
	}

	$("#logout").click(e=>{
		document.getElementById("logout").querySelector("i").className = "ion ion-load-c ion-spin-animation";
		firebase.auth().signOut().then(()=>{
			window.location.href = window.origin + "/admin/logout";
		}).catch(e=>{
			show_error("Signout failed")
		})
	})

	// -------------------------
	// --------- POSTS ---------
	// -------------------------
	function initialize_posts(editor, form){
		let method = form.id.value === "" ? "POST" : "PUT"; 
		$("#save-post").click(e=>{ 
			document.getElementById("save-post").querySelector("i").className = "ion ion-load-c ion-spin-animation";
			console.log(form)
			e.preventDefault()
			e.stopImmediatePropagation()
			let url = null;
			if(method === "POST"){
				url = window.origin + '/api/posts';
			} else {
				url = window.origin + '/api/posts/'+form.id.value;
			}

			let opts = {
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
				headers:{
					'Content-Type': 'application/json',
				}
			}
			fetch(url, opts).then(response=>{
				return response.json()
			}).then(response=>{
				if(response.status === 200){
					show_success(response.message)
					window.location.href = window.origin + '/admin/posts'
				} else {
					throw new Error(response.message)
				}
			}).catch(e=>{
				console.error(e)
				show_error(e.toString());
			})
		})
		$("#delete-post").click(e=>{
			document.getElementById("delete-post").querySelector("i").className = "ion ion-load-c ion-spin-animation";
			e.preventDefault()
			e.stopImmediatePropagation()
			let url = window.origin + '/api/posts/'+form.id.value;
			let opts = {
				method: "DELETE",
				body: JSON.stringify({
					idToken: userToken,
				}),
				credentials: 'same-origin',
				cache: "no-cache",
				headers:{
					'Content-Type': 'application/json',
				}
			}
			fetch(url, opts).then(response=>{
				return response.json()
			}).then(response=>{
				if(response.status === 200){
					show_success(response.message)
					window.location.href = window.location.href = window.origin + '/admin/posts'
				} else {
					show_error(response.message) 
					document.getElementById("delete-post").querySelector("i").className = "ion ion-close";
				}
			}).catch(e=>{
				show_error(e.toString())
				console.error(e)
				document.getElementById("delete-post").querySelector("i").className = "ion ion-close";
			})
		})
		$("#cancel-post").click(e=>{
			e.preventDefault()
			e.stopImmediatePropagation()
			window.location.href = window.origin + '/admin/posts'
		})
	}
	if(typeof simplemde !== "undefined" && typeof document.forms.post_form !=='undefined')
		initialize_posts(simplemde, document.forms.post_form);
})
