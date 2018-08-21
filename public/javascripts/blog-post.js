"use strict";

(function () {
	console.log("blog");
	document.getElementById("post-content").innerHTML = marked(document.getElementById("post-content").innerHTML);
})();