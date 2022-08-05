const { PostsDAO } = require("../db-access");

async function showFeed() {
  const feed = await PostsDAO.findAll();
  return feed;
}

module.exports = {
  showFeed,
};
