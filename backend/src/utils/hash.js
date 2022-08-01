const crypto = require("crypto") // crypto ist wie fs und http ein standard module (muss nicht installiert werden)

function hash(input) {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash
}

function createRandomHash() {
    return hash(Math.random().toString())
}

module.exports = {
    hash,
    createRandomHash
}