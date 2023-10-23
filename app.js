const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const usersRoute = require("./routes/users");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


// app.set("view engine", "ejs");
// app.set("views", "views");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res)=>{
  res.render('home.ejs'), {navs:['login', 'signup']}
})

// users.get('/signup', (req, res)=>{
//   res.render('signup.ejs')
// })

app.use("/", usersRoute);
app.use("/api/v1/tasks", tasks);


app.get('/login', (req, res)=>{
  res.render('login.ejs')
})

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
