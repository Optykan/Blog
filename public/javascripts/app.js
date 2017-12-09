'use strict';

$(document).foundation();

function parallax($elem) {
	var newx = $(window).scrollTop();
	var parallax_scale = 0.1;
	$elem.css('background-position', 'center ' + -newx * parallax_scale + 'px');
}

(function () {
	$(document).scroll(function (e) {
		parallax($('#hero-left'));
	});
})();