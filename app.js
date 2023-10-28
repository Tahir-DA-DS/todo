const express = require("express");
const app = express();
const Taskroute = require("./routes/tasks");
const usersRoute = require("./routes/users");
const connectDB = require("./db/connect");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const isAuth = require('./middleware/checkauth')
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const Task = require("./models/Task");

// app.set("view engine", "ejs");
// app.set("views", "views");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home.ejs"), { navs: ["login", "signup"] };
});

app.get("/dashboard", isAuth, async (req, res) => {
  const userId = req.userId 
  const user = req.user
  try {
    const tasks = await Task.find({user_id:userId});

    res.render("dashboard.ejs", { tasks, userId, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.get('/updateTask/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.render('update.ejs', { task });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie()
  // req.logout(); 

  
  res.redirect('/login');
});


app.use("/", usersRoute);
app.use("/", Taskroute);

// app.get('/login', (req, res)=>{
//   res.render('login.ejs')
// })

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

// routes

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
