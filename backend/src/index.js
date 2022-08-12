const cors = require("cors");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const multer = require("multer");
const express = require("express");
const { registerUser } = require("./use-cases/register-user");
const { showAllUser } = require("./use-cases/show-all-users");
const { loginUser } = require("./use-cases/login-user");
const { makeDoAuthMiddleware } = require("./auth/doAuthMiddleware");
const { refreshUserToken } = require("./use-cases/refresh-user-token");
const { showFeed } = require("./use-cases/show-feed");
const { postGiveGif } = require("./use-cases/post-give-gif");
const { replyToPost } = require("./use-cases/reply-to-post");
const { showMyProfile } = require("./use-cases/show-my-profile");
const { changeUserStatus } = require("./use-cases/change-user-status");
const {
  changeProfilePictrue,
} = require("./use-cases/change-user-profile-picture");

const PORT = 9000;
const app = express();
const doAuthMiddleware = makeDoAuthMiddleware("access");
const doRefreshTokenMiddleware = makeDoAuthMiddleware("refresh");

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

const oneDayInMs = 24 * 60 * 60 * 1000;
const isLocalHost = process.env.FRONTEND_URL === "http://localhost:3000";
app.set("trust proxy", 1); // trust first proxy
// cookie session parser
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;
if (!cookieSessionSecret) {
  throw new Error("COOKIE_SESSION_SECRET env variable is required");
}
app.use(
  cookieSession({
    name: "session",
    secret: cookieSessionSecret,
    httpOnly: true,
    expires: new Date(Date.now() + oneDayInMs),
    sameSite: isLocalHost ? "lax" : "none",
    secure: isLocalHost ? false : true,
  })
);

app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(express.json());

app.get("/", (_, res) => res.send("it works :)"));

app.get("/users", doAuthMiddleware, async (_, res) => {
  try {
    const users = await showAllUser();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { accessToken, refreshToken } = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });
    if (refreshToken) {
      console.log("refresh", refreshToken);
      req.session.refreshToken = refreshToken;
    }
    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});

app.post("/users/refreshtoken", doRefreshTokenMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub;
    const accessToken = await refreshUserToken({ userId });
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});

app.post("/users/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});

// eingeloggter user mit token möchte sein eigenes profil fetchen
app.get("/users/profile", doAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub;
    const userProfile = await showMyProfile({ userId });
    res.json(userProfile);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});

app.get;

app.get("/users/logout", async (req, res) => {
  req.session.refreshToken = null;
  res.status(204).end();
});

app.get("/posts", doAuthMiddleware, async (req, res) => {
  try {
    const feed = await showFeed();
    res.json({ feed });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Error uploading your gif.",
    });
  }
});

const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "uploads");
  },
  filename: function (_, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); //Appending extension
  },
});
const uploadMiddleware = multer({ storage }).single("gif");
app.post(
  "/posts/giveGif",
  doAuthMiddleware,
  uploadMiddleware,
  async (req, res) => {
    try {
      const userId = req.userClaims.sub;
      const postedGif = await postGiveGif({
        userId,
        filepath: req.file.filename,
      });
      res.json(postedGif);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString() || "Error uploading your gif.",
      });
    }
  }
);

app.post(
  "/posts/replyToPost",
  doAuthMiddleware,
  uploadMiddleware,
  async (req, res) => {
    try {
      const userId = req.userClaims.sub;
      const repliedGif = await replyToPost({
        userId,
        filepath: req.file.filename,
        postId: req.body.postId, // "Mother-Post" / "Root-Post"
        replyPath: req.body.replyPath, // how deep the reply goes ?
      });
      res.json(repliedGif);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString() || "Error uploading your gif as reply.",
      });
    }
  }
);

app.put("/users/changestatus", doAuthMiddleware, async (req, res) => {
  try {
    const status = req.body.status;
    const userId = req.userClaims.sub;
    const response = await changeUserStatus({ userId, status });
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Error uploading your gif as reply.",
    });
  }
});

const profilePicStorage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "uploads/profilePictures");
  },
  filename: function (_, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); //Appending extension
  },
});
const profilePicUploadMiddleware = multer({ profilePicStorage }).single(
  "profilePicture"
);
app.put(
  "/users/profilepic",
  doAuthMiddleware,
  profilePicUploadMiddleware,
  async (req, res) => {
    try {
      const profilePicture = req.file.filename;
      const userId = req.userClaims.sub;
      const response = await changeProfilePictrue({ userId, profilePicture });
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString() || "Error uploading your gif as reply.",
      });
    }
  }
);

app.listen(PORT, () => console.log("Server listening at PORT", PORT));

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
* Favorite Posts

Technical stuff:
* S3 Buckets für file-storage
* mongodb für user + postings + likes ...


*/
