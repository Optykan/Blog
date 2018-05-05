var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('blog', { title: 'Express' });
});

router.get('/post', function(req, res, next){
	res.render('blog-page', { title: 'Some Post' });
});

module.exports = router;
