const { UserDAO, PostsDAO } = require("../db-access");
const { makeUser } = require("../domain/User");

async function showMyProfile({ userId }) {
    const foundUser = await UserDAO.findById(userId);
    if (!foundUser) {
        throw new Error("User not found");
    }

    const user = makeUser(foundUser);

    const posts = await PostsDAO.findPostsByUserId(userId);

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        status: user.status,
        posts: posts,
    };
}

module.exports = {
    showMyProfile,
};
