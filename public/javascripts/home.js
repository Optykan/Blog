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