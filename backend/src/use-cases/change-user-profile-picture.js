const { UserDAO } = require("../db-access");

async function changeProfilePictrue({ userId, profilePicture }) {
  console.log(userId, profilePicture);
  const updatedUser = await UserDAO.findUserAndUpdateProfilePicture({
    userId,
    profilePicture,
  });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
}

module.exports = { changeProfilePictrue };
