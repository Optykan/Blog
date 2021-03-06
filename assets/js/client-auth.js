(function(){
	let userToken = null;

	if(typeof firebase === 'undefined'){
		console.error("Could not find firebase")
		return;
	}
	function auth(){
		document.getElementById("login-button").querySelector("i").className = "ion ion-load-c ion-spin-animation";
		let email = document.getElementById("login-email").value
		let password = document.getElementById("login-password").value
		firebase.auth().signInWithEmailAndPassword(email, password).then(userWrapper=>{
			
			userWrapper.user.getIdToken().then(token=>{
				userToken = token;
			
				let url = window.location.origin + "/api/verify-token"
				let body = {
					idToken: userToken
				}
				let opts = {
					method: "POST",
					body: JSON.stringify(body),
					credentials: 'same-origin',
					cache: "no-cache",
					headers:{
						'Content-Type': 'application/json',
					}
				}
				fetch(url, opts).then(response=>{
					console.log("auth success ", response)
					window.location.href = window.origin + "/admin"
				}).catch(e=>{
					console.error(e)
				})
			})
		})
		.catch(function(error) {
		  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  // ...
		  console.error(errorCode, errorMessage)
		});
	}

	document.getElementById("login-button").onclick = auth;
	
	firebase.auth().onAuthStateChanged(user=>{
		if(user){
			user.getIdToken().then(token=>{
				console.log("retrieved token")
				userToken = token;
			})
		} else {
			console.log("not logged in")
		}
	})
})()