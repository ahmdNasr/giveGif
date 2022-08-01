const jwt = require("jsonwebtoken")

function makeDoAuthMiddleware(validTokenType = "access") { // factory
    return function doAuthMiddleware(req, res, next) {
        const __unauthorized = () => res.status(401).json({ message: "Forbidden. Please login first."})
        
        try {
            const token = extractTokenFromRequest(req, validTokenType, __unauthorized)
            
            const userClaims = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] })
            if(userClaims.tokenType !== validTokenType) {
                return __unauthorized() 
            }

            // SUCCESS
            req.userClaims = userClaims
            next()
        } catch (error) {
            console.log(error)
            return __unauthorized()
        }
    }
}

function extractTokenFromRequest(req, tokenType = "access", __unauthorized) {
    // FIXME: Extend with Cookies...
    if(tokenType === "refresh" && req.body?.refreshToken) {
        return req.body.refreshToken
    }

    const tokenInfo = req.headers.token
    console.log(tokenInfo)
    if(!tokenInfo) {
        return __unauthorized()
    }

    const [tokenStrategy, token] = tokenInfo.split(" ")
    if(tokenStrategy !== "JWT" || !token) {
        return __unauthorized()
    }

    return token
}


module.exports = {
    makeDoAuthMiddleware
}