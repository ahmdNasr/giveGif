const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { hash, createRandomHash } = require("../utils/hash");

async function registerUser({ username, email, password }) {
    const passwordSalt = createRandomHash()
    const passwordHash = hash(password + '' + passwordSalt)


    const newUser = makeUser({
        username,
        email,
        emailVerified: false,
        passwordHash,
        passwordSalt,
    })

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