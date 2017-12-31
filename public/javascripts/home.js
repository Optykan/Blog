'use strict';

var hasScrolled = false;
console.log('load');

var $parallax = $('.parallax-static');
var button = $('#blog-link');

function blogButtonCheck() {
	if ($parallax.offset().top < 100) {
		button.addClass('black').removeClass('white');
	} else {
		button.removeClass('black').addClass('white');
	}
}

$('#home').scroll(function (e) {
	if (!hasScrolled) {
		hasScrolled = true;
		setTimeout(function () {
			blogButtonCheck();
			hasScrolled = false;
		}, 250);
	}
});

var wow = new WOW({
	boxClass: 'wow', // animated element css class (default is wow)
	animateClass: 'animated', // animation css class (default is animated)
	offset: 0, // distance to the element when triggering the animation (default is 0)
	mobile: true, // trigger animations on mobile devices (default is true)
	live: true, // act on asynchronously loaded content (default is true)
	scrollContainer: '#home'
});
wow.init();