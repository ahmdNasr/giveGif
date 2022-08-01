const { UserDAO } = require("../db-access");
const { hash, createRandomHash } = require("../utils/hash");

async function registerUser({ name, email, password }) {
    const passwordSalt = createRandomHash()
    const passwordHash = hash(password + '' + passwordSalt) 

    const newUser = {
        name,
        email,
        emailVerified: false,
        passwordHash,
        passwordSalt,
    }

    const insertResult = await UserDAO.insertOne(newUser)
    const userView = ({
        _id: insertResult.insertedId,
        name,
        email,
    })

    return userView
}

module.exports = {
    registerUser
}