const { PostsDAO } = require("../db-access");
const {
  enrichPostsWithUserInfos,
} = require("./background-services/enrich-posts-with-userinfos");

async function showFeed() {
  const feedPosts = await PostsDAO.findAll();
  const feed = enrichPostsWithUserInfos({ posts: feedPosts });
  return feed;
}

module.exports = {
  showFeed,
};
