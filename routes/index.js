var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'Express',
		projects: [{
			title: 'Avante Landscaping',
			image: '/images/portfolio/avante-1.jpg',
			description: 'some words here',
			link: 'https://avantelandscaping.com'	
		},{
			title: 'Unionville Skating Club',
			image: '/images/portfolio/usc-1.jpg',
			description: 'more words here',
			link: 'https://unionvilleskatingclub.com'
		},{
			title: 'Project 5K',
			image: 'http://via.placeholder.com/300x300',
			description: 'even more words',
			link: 'https://project5k.ca'
		}	
		]
	});
});

module.exports = router;
