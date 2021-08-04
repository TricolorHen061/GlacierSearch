import { MongoClient } from "mongodb"

const databaseClient = new MongoClient("mongodb://localhost:27017", {useUnifiedTopology : true})
var connectedToDatabase = false
var database = null

export async function getCollection(collectionName) {
    if(!connectedToDatabase){
        await databaseClient.connect().then(() => {connectedToDatabase = true; database = databaseClient.db("glaciersearch")}).catch(console.dir)
    }
    return database.collection(collectionName)

}

export async function add(collection, key, value, ID) {
    return await collection.insertOne({"_id" : String(ID), [key] : value})
}

export async function remove(collection, key, value, ID) {
    return await collection.updateOne({"_id" : String(ID)}, {"$pull" : {[key] : value}})
}

export async function find(collection, ID) {
    return await collection.findOne({"_id" : String(ID)})
}

export async function update(collection, key, value, ID) {
    await checkIfKeyExists(collection, key, ID)
    return await collection.updateOne({"_id" : String(ID)}, {"$push" : {[key] : value}})
}

export async function erase(collection, ID) {
    return await collection.deleteOne({"_id" : String(ID)})
}
export async function modify(collection, key, value, ID) {
    await checkIfKeyExists(collection, key, ID)
    return await collection.updateOne({"_id" : String(ID)}, {"$set" : {[key] : value}})
}

async function checkIfKeyExists(collection, key, ID) {
    if(!await find(collection, ID)) {
        await add(collection, key, "", ID)
    }
}
