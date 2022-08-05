function makePost({
  _id,
  filepath,
  postedBy,
  postedAt = Date.now(),
  replies = [],
}) {
  if (!filepath) {
    throw new Error("filepath of post must exist");
  }
  if (!postedBy) {
    throw new Error("posted by must be user id");
  }

  return {
    _id,
    filepath,
    postedBy,
    postedAt,
    replies,
    // [{ filepath, postedBy, postedAt, replies }]
    // keine _id weil es kein mongo document ist
  };
}

module.exports = {
  makePost,
};
