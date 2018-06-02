var express = require('express');
var router = express.Router();
const Response = require('./Response')
const admin = require("firebase-admin")
require('dotenv').config()

var serviceAccount = require("./../firebase-creds.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_URL
});

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
	var ref = db.ref("/portfolio/"+req.params.id);
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
	let response = null;
	console.log(req.body)
	admin.auth().verifyIdToken(req.body.idToken)
	  .then(function(decodedToken) {
		response = new Response(Response.STATUS_OK, "Verified successfully", decodedToken)
		response.send(res)
	  }).catch(function(error) {
		response = new Response(Response.STATUS_OK, "Could not verify", error)
		response.send(res)
	  })
})

module.exports = router;
