"use strict";

(function () {
	console.log("blog");
	var postContainer = document.getElementById("post-content");
	var postContent = postContainer.innerHTML;
	postContent = postContent.replace(/\&amp;gt;/gi, '>');

	postContainer.innerHTML = marked(postContent);
})();