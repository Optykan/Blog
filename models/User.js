const Mongo = new (require('./Mongo'))

const PermissionLevel = {
	ADMIN: 1,
	USER: 2
}

class User{
	constructor(id){
		this.id=id
	}
	update(){

	}
	delete(){

	}
	static findOrCreate(user){
		console.log(user)
		let userFromDB = User.findById(user.id)

		if(userFromDB){
			return userFromDB
		}else{
			return User.create(user)
		}
		// return Mongo.find({"_id": user.id}, 'users')

	}
	static create(user){
		return Mongo.insert(user, 'users')
		// console.log(result)
		// return result
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
		return User.findById(user.id)
	}
	static findById(id){
		return Mongo.find({"_id": id}, 'users')	
	}
}

module.exports = User