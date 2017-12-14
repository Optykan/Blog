require('dotenv').config()
var MongoClient = require('mongodb').MongoClient

// var MongoClient = require('mongoskin')
// var dbConnection = MongoClient.db(process.env.MONGO_DB_URL)

class Mongo{
	constructor(){
		MongoClient.connect(process.env.MONGO_DB_URL, (err, client)=>{
			if(err)
				reject('MongoDB connection failed')

			this.connection = client.db('heroku_dmf772t1')
		})
	}
	// async newexecute(fnParams, fns){
	// 	//where fn is an array of functions in order of calling from left to right
	// 	//good god is this what CS135 is teaching because i dont know what im doing

	// 	if(typeof fns === 'object'){
	// 		return new Promise((resolve, reject) => {
	// 			let result = fns.reduce((accumulator, current, currentIndex)=>{
	// 				//the current value is actually a function
	// 				// the accumulator holds the past function calls
	// 				await new Promise((resolve, reject)=>{
	// 					accumulator.current(...fnParams[currentIndex], (err, response)=>{
	// 						if(err){
	// 							reject(err)
	// 						}else{								
	// 							resolve(response)
	// 						}
	// 					})
	// 				})
	// 			})
	// 			return result
	// 		})
	// 	}
	// 	else{
	// 		//fns was actually one function
	// 		return new Promise((resolve, reject)=>{
	// 			let result = await fns(...fnParams)
	// 			resolve(result)
	// 		})
	// 	}
	// }

	execute(params, fn){
		return new Promise((resolve, reject)=>{
			fn(...params, (err, response)=>{
				if(err){
					reject(err)
				}else{
					resolve(response)
				}
			})
		})
	}

	update(identifier, newData, collectionName, upsert = true){
		let params = [identifier, {$set: newData}, {upsert: upsert}]
		let collection = this.connection.collection(collectionName)

		return new Promise((resolve, reject)=>{
			collection.updateOne(...params, (err, result)=>{
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})


		// return this.execute(params, collection.updateOne)

		// return new Promise ((resolve, reject)=>{
		// 	collection.updateOne(...params, (err, response)=>{

		// 	})
		// })
	}
	find(identifier, collectionName, limit=1){
		let params = [identifier]
		let collection = this.connection.collection(collectionName)

		return new Promise((resolve, reject)=>{
			collection.find(identifier).limit(limit).toArray((err, response)=>{
				console.log(response)
				if(err){
					reject(err)
				}else{
					resolve(response)
				}
			})
		})

		// return this.execute(params, collection.find).then(res=>{
		// 	// return res.limit(limit).toArray()
		// 	return res
		// })

	}
}


// module.exports = new Promise((resolve, reject)=>{
// 	MongoClient.connect(process.env.MONGO_DB_URL, (err, client)=>{
// 		if(err)
// 			reject('MongoDB connection failed')

// 		dbConnection = client.db('heroku_dmf772t1')
// 		resolve(dbConnection)
// 	})
// })

module.exports = Mongo