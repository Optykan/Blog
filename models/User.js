const Mongo = new (require('./Mongo'))

const PermissionLevel = {
	ADMIN: 1,
	USER: 2
}

class User{
	update(){

	}
	delete(){

	}
	static findOrCreate(user){
		console.log(user.id)
		return User.create(user)
		// return Mongo.find({"_id": user.id}, 'users')

	}
	static create(user){
		return Mongo.update({"_id": user.id}, user, 'users')
		// return new Promise((resolve, reject)=>{
		// 	collection.updateOne(...postParams, (err, result)=>{
		// 		if(err)
		// 			reject(err)
		// 		else
		// 			resolve(result)
		// 	})
		// })
	}
	static find(user){
		return Mongo.find({"_id": user.id})
	}
}

module.exports = User