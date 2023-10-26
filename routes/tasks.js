const express = require('express')
const router = express.Router()
const Todo = require('../models/Task')

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

router.get("/add-todo", async(req, res) => {
  const allTodo = await Todo.find();
  res.render("dasboard.ejs", {todo: allTodo})
})


router.post('/add-todo', async(req, res)=>{
  try {
    const{todo} = req.body
    const task = await createTask({todo})
    console.log(task);
    if(task.code == 201){
      res.redirect('/add-todo')
    }
    res.redirect('/')
  } catch (error) {
    res.send(error)
    
  }

})
router.route('/').get(getAllTasks)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
