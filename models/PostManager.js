// var db = {}
// require('./Mongo').then(conn=>{
// 	db = conn
// }).catch(e=>{
// 	throw e //what's the point of catching it if we're just gonna throw it again
// })

class PostManager{
	static insert(post){
		if(!db)
			throw new Error('Database connection doesn\'t exist')
		post.id = 1
		let collection = db.collection('posts')
		let postParams = [{"_id": post.id}, {$set: post}, {upsert: true}]
		
		return new Promise((resolve, reject)=>{
			collection.updateOne(...postParams, (err, result)=>{
				if(err)
					reject(err)
				else
					resolve(result)
			})
		})
	}
}

module.exports = PostManager