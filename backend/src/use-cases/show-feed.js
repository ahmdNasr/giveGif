const { PostsDAO, UserDAO } = require("../db-access");

async function showFeed() {
  const feedPosts = await PostsDAO.findAll();

  const allUserIds = extractUserIdsFromPostsAndReplies(feedPosts);
  const uniqueUserIds = Array.from(new Set(allUserIds));

  const postedByUsersViewArray = await UserDAO.findMultipleByIds(uniqueUserIds);
  const postedByUsersObjDictionary = usersAsDictionaryWithIdAsKey(
    postedByUsersViewArray
  );

  const feed = mapPostedByIdsToUserObjectsRecursive(
    feedPosts,
    postedByUsersObjDictionary
  );

  return feed;
}

// Example:
// postedByUsersViewArray [{ _id: "63f4...", username: "peter", ...}, { _id: "63f5...", ...}, { _id:"63f6...", }}
// postedByUsersObj = { "63f4...": { _id: "63f4...", username: "peter", ...}, "63f5...": {_id: "63f5...", ...}, ...}
function usersAsDictionaryWithIdAsKey(usersArray) {
  const dictionary = usersArray.reduce((dictAcc, user) => {
    dictAcc[user._id] = user; // lege den key user._id in der dictionary an
    return dictAcc; // gib die dictionary für die nächste Iteration weiter
  }, {});

  return dictionary;
}

function mapPostedByIdsToUserObjectsRecursive(posts, allUsersDictionary) {
  // base case
  if (!posts || !allUsersDictionary) {
    return [];
  }

  // recursion logic
  return posts.map((post) => {
    const postWithUserInfo = {
      ...post,
      postedBy: allUsersDictionary[post.postedBy],
      // treat replies as the next "first layer"
      replies: mapPostedByIdsToUserObjectsRecursive(
        post.replies,
        allUsersDictionary
      ),
    };
    return postWithUserInfo;
  });
}

// a function to extract all usersIds including those of replyHell (recursive)
function extractUserIdsFromPostsAndReplies(posts) {
  if (!posts) {
    return [];
  }

  const userIdsCurrentLayer = posts.map((post) => post.postedBy);
  const userIdsNextLayer = posts
    .map((post) => extractUserIdsFromPostsAndReplies(post.replies))
    .flat();
  return [...userIdsCurrentLayer, ...userIdsNextLayer];
}

module.exports = {
  showFeed,
};

// feedPosts:

/*
  [
    { 
      postedBy: "<id1>", 
      replies: [
        {
          postedBy: "<id2>",
          replies: [
            { postedBy: "<id3>",  replies: [
            { postedBy: "<id3>",  replies: [
            { postedBy: "<id3>",  replies: [
            { postedBy: "<id3>",  replies: [
            { postedBy: "<id3>"}, { postedBy: "<id100>",  }
          ]}
          ]}
          ]}
          ]}
          ]
        },
        {
          postedBy: "<id4>"
        }
      ] 
    }
  ]

  extractUserIdsFromPostsAndReplies(postsArray)

  currentLayer =[  <id1> ]

  [
        {
          postedBy: "<id2>",
          replies: [
            { postedBy: "<id3>" }
          ]
        },
        {
          postedBy: "<id4>"
        }
  ] 
  
  nextLayer = extractUserIdsFromPostsAndReplies()

    currentLayer = [<id2>, <id4>]

     replies: [
            { postedBy: "<id3>" }
          ]
    nextLayer = extractUserIdsFromPostsAndReplies() 
      currentLayer = [<id3>]
          nextLayer = extractUserIdsFromPostsAndReplies(undefined)
            currentLayer = []
    & nextLayer = extractUserIdsFromPostsAndReplies(undefined) ===> 
      currentLayer = []

    [<id3>, [], []].flat() => [<id3>]

*/
