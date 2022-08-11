const { UserDAO } = require('../db-access');
const { makeUser } = require('../domain/User');

async function changeUserStatus({ userId, status }) {
	if (status !== 'off the line' && status !== 'on the line') {
		throw new Error('Invalid Status');
	}

	const { value: updatedUser } = await UserDAO.findUserAndUpdateStatus({
		userId,
		status,
	});
	if (!updatedUser) {
		throw new Error('No User found');
	}
  const userView = {
    _id: updatedUser._id,
    username: updatedUser.username,
    profilePicture: updatedUser.profilePicture,
    email: updatedUser.email,
    status: updatedUser.status,
  }
	return userView;
}

module.exports = {
	changeUserStatus,
};
