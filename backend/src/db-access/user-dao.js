const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

const usersCollectionName = "users-token";

async function findAll() {
  const db = await getDB();
  const users = await db.collection(usersCollectionName).find().toArray(); // toArray() returned auch eine promise, daher await
  return users;
}

async function findById(id) {
  const db = await getDB();
  const foundUser = await db
    .collection(usersCollectionName)
    .findOne({ _id: ObjectId(id) }); // findOne() returned auch eine promise, daher await
  return foundUser;
}

async function findMultipleByIds(userIdsArray) {
  const db = await getDB();

  const userIds = userIdsArray.map((id) => ObjectId(id));
  return db
    .collection(usersCollectionName)
    .find({ _id: { $in: userIds } })
    .project({ _id: 1, username: 1, email: 1, profilePicture: 1, status: 1 })
    .toArray();
}

async function findByEmail(email) {
  const db = await getDB();
  const foundUser = await db
    .collection(usersCollectionName)
    .findOne({ email: email });
  return foundUser;
}

async function insertOne(userInfo) {
  const db = await getDB();
  // wir können das direkt returnen auch (muss nicht wie oben alles extra benannt werden)
  return db.collection(usersCollectionName).insertOne(userInfo); // insertOne() returned auch eine promise, daher await
}

async function findUserAndUpdateStatus({ userId, status }) {
  const db = await getDB();
  return db
    .collection(usersCollectionName)
    .findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: { status } },
      { returnDocument: "after" }
    );
}

async function findUserAndUpdateProfilePicture({ userId, profilePicture }) {
  const db = await getDB();
  return db
    .collection(usersCollectionName)
    .findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: { profilePicture } },
      { returnDocument: "after" }
    );
}

module.exports = {
  findAll,
  findById,
  findMultipleByIds,
  findByEmail,
  insertOne,
  findUserAndUpdateStatus,
  findUserAndUpdateProfilePicture,
};
