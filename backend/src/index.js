const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const { registerUser } = require("./use-cases/register-user")
const { showAllUser } = require("./use-cases/show-all-users")
const { loginUser } = require("./use-cases/login-user")
const { makeDoAuthMiddleware } = require("./auth/doAuthMiddleware")
const { refreshUserToken } = require("./use-cases/refresh-user-token")

const PORT = 9000
const app = express()
const doAuthMiddleware = makeDoAuthMiddleware("access")
const doRefreshTokenMiddleware = makeDoAuthMiddleware("refresh")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (_, res) => res.send("it works :)"))

app.get("/users", doAuthMiddleware, async (_, res) => {
    try {
        const users = await showAllUser()
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.toString() || "Internal Server Error." })
    }
})

app.post("/users/login", async (req, res) => {
    try {
        const { accessToken, refreshToken } = await loginUser({
            email: req.body.email,
            password: req.body.password
        })
        res.json({ accessToken, refreshToken })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.toString() || "Internal Server Error." })
    }
})

app.post("/users/refreshtoken", doRefreshTokenMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub
        const accessToken = await refreshUserToken({ userId })
        res.json({ token: accessToken })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.toString() || "Internal Server Error." })
    }
})

app.post("/users/register", async (req, res) => {
    try{ 
        const user = await registerUser(req.body)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.toString() || "Internal Server Error." })
    }
})


app.listen(PORT, () => console.log("Server listening at PORT", PORT))


/*


# Frontend Protected Sites Logic

In der APP js:
1. const [token, setToken] = useState(null)
2. <Route path="/dashboard" element={ <Dashboard token={token} />} />

In der Dashboard Component:
const Dashboard = (props) => {
    ...

    if(!props.token || token.length === 0) return <Navigate to="/login" />
    else return (
        <div>
            ... Dashboard ...
        </div>
    )
}

Exchangeagram

* Users 
    * Auth: Login / Register / Forgot Password
    * Profile
        * profile picture
        * username
        * status
        * follower / followed by
    * status von user "on the line" & "off the line"
* Postings (Images) + Reply auch mit Images...
    * ReplyHell: Auf ein Reply kann man nochmal replyn
    * Feed mit Ranking basieren auf Likes + Images + ReplyHell 
* verschiedenen Likes (Mülltonne + Herz + ...)
* Melde-Button für verstörende Inhalte
    -> Admin bekommt eine E-Mail
    -> bei >20% oder mindestens 3 Meldungen von Likes wird der post automatisch versteckt, bis der admin es bestätigt / zurücksetzt
* Follow function

Technical stuff:
* S3 Buckets für file-storage
* mongodb für user + postings + likes ...


*/