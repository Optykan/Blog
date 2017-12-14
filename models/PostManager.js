class PostManager{
	static insert(post){
		console.log(global.mongoDB)
		try{
			post.id = 1
			let collection = global.mongoDB.collection('posts')
			// let res = collection.updateOne({"_id": post.id}, 
			// 	{$set: post},
			// 	{upsert: true})
			let res = collection.insertOne(post)
			res.success=true
			return res

		} catch(e){
			return e
		}
	}
	set db(conn){
		db = conn
	}
}

module.exports = PostManager