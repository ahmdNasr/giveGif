const { UserDAO } = require("../db-access");
const { hash, createRandomHash } = require("../utils/hash");

async function registerUser({ username, email, password }) {
    const passwordSalt = createRandomHash()
    const passwordHash = hash(password + '' + passwordSalt) 

    const newUser = {
        username,
        email,
        emailVerified: false,
        passwordHash,
        passwordSalt,
    }

    const insertResult = await UserDAO.insertOne(newUser)
    const userView = ({
        _id: insertResult.insertedId,
        username,
        email,
    })

    return userView
}

module.exports = {
    registerUser
}