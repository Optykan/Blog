(function(){
	console.log("blog")
	let postContainer = document.getElementById("blog-post-content");
	let postContent = postContainer.innerHTML;
	postContent = postContent.replace(/\&gt;/gi, '>').replace(/\&lt;/gi, '<').replace(/\n/g, '\n\n');
	
	postContainer.innerHTML = marked(postContent);

	hljs.initHighlightingOnLoad();

	console.log("rendered content")
})()