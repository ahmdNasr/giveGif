const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

const usersCollectionName = "posts-give-gif";

async function findAll() {
  const db = await getDB();
  const users = await db.collection(usersCollectionName).find().toArray();
  return users;
}

async function findById(id) {
  const db = await getDB();
  const foundUser = await db
    .collection(usersCollectionName)
    .findOne({ _id: ObjectId(id) });
  return foundUser;
}

async function insertOne(userInfo) {
  const db = await getDB();
  return db.collection(usersCollectionName).insertOne(userInfo);
}

// replyPath: "replies" --> reply to mother post
// replyPath: "replies.11.replies" --> reply to first reply of mother post
// replyPath: "replies.0.replies.2.replies.3.replies" --> reply to some very deep nested reply
async function updatePostReplyHell(postId, replyPath, replyPost) {
  const db = await getDB();

  // IDEA: make "replyPath" just an array of indezies and add all the "replies." before and after each index ?
  const updateQuery = {
    [replyPath]: replyPost, // hier erstellen wir ein objekt-feld mit dem namen vom string von replyPath
  };

  return db
    .collection(usersCollectionName)
    .updateOne({ _id: ObjectId(postId) }, { $push: updateQuery });
}

module.exports = {
  findAll,
  findById,
  updatePostReplyHell,
  insertOne,
};
