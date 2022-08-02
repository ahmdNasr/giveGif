
function makeUser({
    _id,
    username,
    email,
    profilePicture = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    status = "off the line",
    passwordHash,
    passwordSalt,
}) {
    if(!email) {
        throw new Error("email must exist")
    }

    return {
        _id,
        username,
        profilePicture,
        email,
        status,
        passwordHash,
        passwordSalt
    }
}

module.exports = {
    makeUser
}