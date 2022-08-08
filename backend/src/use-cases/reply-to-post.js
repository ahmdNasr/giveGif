const { PostsDAO } = require("../db-access");
const { makePost } = require("../domain/Post");

async function replyToPost({ userId, filepath, postId, replyPath }) {
  const replyPostInfo = {
    postedBy: userId,
    filepath,
    repliedAt: Date.now(),
    replies: [],
  };
  const replyPost = makePost(replyPostInfo);
  delete replyPost._id;

  const result = await PostsDAO.updatePostReplyHell(
    postId,
    replyPath,
    replyPost
  );
  console.log(result);
  return result;
}

module.exports = {
  replyToPost,
};
