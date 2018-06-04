var express = require('express');
var router = express.Router();
const Response = require('./Response')
const admin = require("firebase-admin")
require('dotenv').config()

/* GET API. */
router.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let response = new Response(Response.STATUS_OK, 'Hello, world!', null);
	response.send(res);
	// res.send(JSON.stringify({ message: Response.STATUS_NOT_FOUND}));
});

router.get('/posts', function(req, res, next){
	var db = admin.database();
	var ref = db.ref("/posts");
	ref.on("value", snapshot => {
		let response = null;
		if(snapshot.exists()){
			response = new Response(Response.STATUS_OK, 'Retrieved all posts successfully', snapshot.val());
		} else {
			response = new Response(Response.STATUS_NOT_FOUND, 'Could not find snapshot', null);
		}
		response.send(res);
	})
});

router.get('/posts/:id', function(req, res, next){
	var db = admin.database();
	var ref = db.ref("/posts/"+req.params.id);
	ref.on("value", snapshot => {
		let response = null;
		if(snapshot.exists()){
			response = new Response(Response.STATUS_OK, 'Retrieved posts successfully', snapshot.val());
		} else {
			response = new Response(Response.STATUS_NOT_FOUND, 'Could not find snapshot', null);
		}
		response.send(res);
	})
});


router.post('/posts', function(req, res, next){
	admin.auth().verifyIdToken(req.body.idToken)
	  .then(function(decodedToken) {
	    var uid = decodedToken.uid;
		    // ...
	  }).catch(function(error) {
	    // Handle error
	  });
})

router.post('/verify-token', function(req, res, next){
	const idToken = req.body.idToken
	const expiresIn = 60 * 60 * 24 * 5 * 1000;

	let response = null;
	console.log(req.body)
	admin.auth().createSessionCookie(req.body.idToken, { expiresIn })
	  .then(function(cookie) {
	  	const options = { maxAge: expiresIn, httpOnly: true }
	  	res.cookie('session', cookie, options)
		response = new Response(Response.STATUS_OK, "Verification success", null) 
		response.send(res)
	  }).catch(function(error) {
		response = new Response(Response.STATUS_UNAUTHORIZED, "Could not verify", error)
		response.send(res)
	  })
})

module.exports = router;
