(function(){
	if(typeof firebase === 'undefined'){
		console.error("Could not find firebase")
		return;
	}
	function auth(){
		console.log("auth")
		let email = document.getElementById("login-email").value
		let password = document.getElementById("login-password").value
		firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
			console.log("auth success")
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
				console.log("token ", token)
			})
		} else {
			console.log("not logged in")
		}
	})
})()