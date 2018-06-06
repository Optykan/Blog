(function(){
	$(document).foundation();

	function show_alert(title, message, className){
		$("#alert-message").text(message)
		$("#alert").show()
		document.getElementById("alert").className = "callout "+className;
	}

	function show_error(message){
		show_alert('Error', message, 'alert')
	}

	$("#logout").click(e=>{
		document.getElementById("logout").querySelector("i").className = "ion ion-load-c ion-spin-animation";
		firebase.auth().signOut().then(()=>{
			window.location.href = window.origin + "/admin/logout";
		}).catch(e=>{
			show_error("Signout failed")
		})
	})

	$("#save-post").click(e=>{
		e.preventDefault()
		let url = window.origin + '/api/posts/'+Date.now();
		let opts = {
			method: "POST",
			body: JSON.stringify({
				idToken: userToken
			}),
			credentials: 'same-origin',
			cache: "no-cache",
			headers:{
				'Content-Type': 'application/json',
			}
		}
		fetch(url, opts).then(response=>{
			console.log(response)
		}).catch(e=>{
			show_error(e);
		})
	})
	$("#cancel-post").click(e=>{
		window.location.href = window.origin + '/admin/posts'
		e.preventDefault()
	})
})()