(function(){
	console.log("blog")
	let postContainer = document.getElementById("post-content");
	let postContent = postContainer.innerHTML;
	postContent = postContent.replace(/\&amp;gt;/gi, '>');
	
	postContainer.innerHTML = marked(postContent);
})()