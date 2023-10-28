const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/checkauth')



const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')

// router.get('/add-todo', (req, res)=>{
//   res.render('dashboard.ejs')
// })

// router.get("/add-todo", async(req, res) => {
//   const allTodo = await Task.find();
//   res.render("dasboard.ejs", {todo: allTodo})
// })



router.get('/deleteTask/:taskId', deleteTask)

router.post('/add-todo', isAuth, createTask)


router.post('/updateTask/:taskId', updateTask)
router.route('/').get(getAllTasks)
router.route('/:id').get(getTask)

module.exports = router
