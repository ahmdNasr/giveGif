const { PostsDAO } = require("../db-access");
const { makePost } = require("../domain/Post");

async function postGiveGif({ userId, filepath }) {
  const post = makePost({ postedBy: userId, filepath });
  const insertResult = await PostsDAO.insertOne(post);
  return makePost({ ...post, _id: insertResult.insertedId });
}

module.exports = {
  postGiveGif,
};
