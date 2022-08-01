
function makeUser({
    _id,
    name,
    email,
    passwordHash,
    passwordSalt
}) {
    if(!email) {
        throw new Error("email must exist")
    }

    return {
        _id,
        name,
        email,
        passwordHash,
        passwordSalt
    }
}

module.exports = {
    makeUser
}