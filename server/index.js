const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const { sessionMiddleware, wrap, corsConfig } = require("./controllers/serverController");
const { authorizeUser } = require("./controllers/socketController");
const server = require("http").createServer(app);

require('dotenv').config()

const io = new Server(server, {
    cors: corsConfig,
});

const sessionSecret = process.env.COOKIE_SECRET;

if (!sessionSecret) {
    throw new Error("COOKIE_SECRET is not defined in environment variables");
}

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json())
app.use(sessionMiddleware)
app.use("/auth", authRouter);

io.use(wrap(sessionMiddleware))
io.use(authorizeUser);
io.on("connect", socket => {
    console.log("USERID: ", socket.user.userid);
    console.log(socket.id);
    console.log(socket.request.session.user.username)
})

server.listen(4000, () => {
    console.log("server listening on port 4000")
})