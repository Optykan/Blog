"use strict";

(function () {
	console.log("blog");
	var postContainer = document.getElementById("blog-post-content");
	var postContent = postContainer.innerHTML;
	postContent = postContent.replace(/\&gt;/gi, '>').replace(/\&lt;/gi, '<');

	// postContainer.innerHTML = marked(postContent);

	hljs.initHighlightingOnLoad();

	console.log("rendered content");
})();