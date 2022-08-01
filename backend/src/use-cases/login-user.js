const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const jwt = require("jsonwebtoken");
const { hash } = require("../utils/hash");
const { createToken } = require("../utils/createToken");

async function loginUser({ email, password }) {
    const foundUser = await UserDAO.findByEmail(email)
    if(!foundUser) {
        throw new Error("Problem logging in")
    }

    const user = makeUser(foundUser)
    const passwordHash = hash(password + '' + user.passwordSalt)
    
    const correctPassword = user.passwordHash === passwordHash
    if(!correctPassword) {
        throw new Error("Problem logging in")
    }

    const ONE_DAY = 24 * 60 * 60
    const accessToken = createToken(user)
    const refreshToken = createToken(user, ONE_DAY, "refresh")
    return { accessToken, refreshToken }
}

module.exports = {
    loginUser
}