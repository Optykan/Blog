var express = require('express');
var router = express.Router();
const admin = require("firebase-admin")
const Response = require('./Response')

router.use(function(req, res, next){
	let cookie = req.cookies.session || ""
	
	admin.auth().verifySessionCookie(cookie, true).then(decodedClaims =>{
		console.log(decodedClaims)
		next()
	}).catch(err=>{
		let error = new Error('Unauthorized')
		error.status = Response.STATUS_UNAUTHORIZED;
		return next(error)
	})
})

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('admin/admin', { title: 'Express' });
});

module.exports = router;
