const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

const usersCollectionName = "users-token"

async function findAll() {
    const db = await getDB()
    const users = await db.collection(usersCollectionName).find().toArray() // toArray() returned auch eine promise, daher await
    return users
}

async function findById(id) {
    const db = await getDB()
    const foundUser = await db.collection(usersCollectionName).findOne({ _id: ObjectId(id) }) // findOne() returned auch eine promise, daher await
    return foundUser
}

async function findByEmail(email) {
    const db = await getDB()
    const foundUser = await db.collection(usersCollectionName).findOne({ email: email })
    return foundUser
}

async function insertOne(userInfo) {
    const db = await getDB()
    // wir können das direkt returnen auch (muss nicht wie oben alles extra benannt werden)
    return db.collection(usersCollectionName).insertOne(userInfo) // insertOne() returned auch eine promise, daher await
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    insertOne
}