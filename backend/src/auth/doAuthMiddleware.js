const jwt = require("jsonwebtoken")

function doAuthMiddleware(req, res, next) {
    const __unauthorized = () => res.status(401).json({ message: "Forbidden. Please login first."})

    const tokenInfo = req.headers.token
    const [tokenType, token] = tokenInfo.split(" ")
    
    if(tokenType !== "JWT" || !token) {
        return __unauthorized()
    }

    try {
        const userClaims = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] })
        req.userClaims = userClaims
        next()
    } catch (error) {
        console.log(error)
        return __unauthorized()
    }
}

module.exports = {
    doAuthMiddleware
}