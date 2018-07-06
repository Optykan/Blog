var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('blog', { 
		title: 'Blog | Samuel Yang',
		projects: [{
			title: 'Avante Landscaping',
			subtitle: 'WordPress•Foundation6',
			image: '/images/portfolio/avante-1.jpg',
			description: 'Solo project developed in conjunction with the weonderful team at nvision. Built on the WordPress platform.',
			link: 'https://avantelandscaping.com'	
		},{
			title: 'Unionville Skating Club',
			subtitle: 'WordPress•Foundation6',
			image: '/images/portfolio/usc-1.jpg',
			description: 'The second of two projects developed at nvision. Quite the massive project, so it was a team project.',
			link: 'https://unionvilleskatingclub.com'
		},{
			title: 'Tzuyu',
			subtitle: 'Node.js',
			image: 'https://via.placeholder.com/300x300',
			description: 'IA discord bot built on discord.js that supports playing music, permission management (ish), and rendering LaTeX. It also has support for user-developed plugins.',
			link: 'https://github.com/Optykan/Tzuyu'
		},{
			title: 'Beat',
			subtitle: 'MongoDB•Angular•Ionic',
			image: '/images/portfolio/beat-1.jpg',
			description: 'PennApps XVII Top 10! Based on the all-too-popular Pitch Perfect riff-off concept.',
			link: 'https://github.com/kpsuperplane/pennapps-beat/' 
		},{
			title: 'TeachAssist Scraper',
			subtitle: 'PHP',
			image: '/images/portfolio/teachassist-1.jpg',
			description: 'Using 100% legitimate and approved methods, it attempts to scrape your marks from YRDSB TeachAssist. Basically it just looks better.',
			link: 'https://github.com/Optykan/TeachAssist'
		},{
			title: 'Boilerplate',
			subtitle: 'Various',
			image: 'https://via.placeholder.com/300x300',
			description: 'React + Foundation6 + Sass + Gulp.js + Browserify + Express.js + Babel makes for easy site setup. Just clone it and get started!',
			link: 'https://github.com/Optykan/site-boilerplate'
		},{
			title: 'Blog',
			subtitle: 'Node.js•Express•Foundation 6',
			image: '/images/portfolio/blog-1.jpg',
			description: 'Well, you\'re literally looking at it. Built from scratch based on my boilerplate.',
			link: 'https://github.com/Optykan/Blog'
		}
		]
	});
});

router.get('/post', function(req, res, next){
	res.render('blog-page', { title: 'Some Post' });
});

module.exports = router;
