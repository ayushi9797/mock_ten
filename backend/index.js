const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const UserRouter = require("./router/User.Router");

const app = express();
app.use(cors())
// connecting with http for socket.io
const http = require("http").createServer(app)

//public folder 

app.use(express.static(__dirname + "/public"))

app.use(express.json());

//routers

app.use("/users", UserRouter)

// Home route
// app.get("/", (req, res) => {
//   res.send(`<h1> HOME ROUTER </h1>`);
// });

// index html file

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// connection to server

http.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`app listening on port ${process.env.port}`);
  } catch (error) {
    console.log({ error: `error in connections with port: ${error.message}` });
  }
});

// socket connection

const io = require('socket.io')(http)

// making client connected

io.on("connection", (socket) => {
  console.log(`connected to client`)

  socket.on("message", (msg) => {
    socket.broadcast.emit(`message`, msg)
    console.log(msg)
  })
})

