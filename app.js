const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const checkAuth = require("./middleware/checkauth");

app.set("view engine", "ejs");
app.set("views", "views");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("views"));

// routes
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use(express.static("public"));
app.use("/", users);
app.use("/api/v1/tasks", checkAuth, tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
