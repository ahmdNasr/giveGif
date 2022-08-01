const { UserDAO } = require("../db-access");

async function showAllUser() {
    const usersArray = await UserDAO.findAll()
    return usersArray.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
    }))
}

module.exports = {
    showAllUser
}