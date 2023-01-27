const express = require("express");
const http = require("http");
const cors = require("cors");
const mapRoutes = require("express-routes-mapper");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
const server = http.Server(app);

const dbService = require("./api/services/db.service");
const DB = dbService().start();

// middlewares
const authMiddleware = require("./api/middlewares/auth.middleware");

// router
const authRoutes = require("./router/AuthRoute");
const userRoutes = require("./router/UserRoute");
const coffeeRoutes = require("./router/CoffeeRoute");
const UploadRoutes = require("./router/UploadRoute");
const auth = mapRoutes(authRoutes, "api/controllers/");
const user = mapRoutes(userRoutes, "api/controllers/");
const coffee = mapRoutes(coffeeRoutes, "api/controllers/");
const upload = mapRoutes(UploadRoutes, "api/controllers/");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("/api/*", (req, res, next) => authMiddleware(req, res, next));
app.use("/auth", auth);
app.use("/api/user", user);
app.use("/api/coffee", coffee);
app.use("/api/upload", upload);

app.use("/storage/images", express.static("storage/images"));

// socket io
const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:5173"],
  },
});

io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });

  socket.on("order", (data) => {
    console.log(data);
    io.emit("order", data);
  });

  socket.on("finish-order", (data) => {
    console.log("finish-order: ", data);
    io.emit(`receive-${data.id}`, data);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
  return DB;
});
