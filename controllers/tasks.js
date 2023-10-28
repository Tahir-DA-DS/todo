const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Todo.find({})
  res.status(200).json({ tasks })
})


const createTask = async (req, res) => {
  const { todo } = req.body;
  const userId = req.userId 
  const user = req.user

  try {
    const newTask = new Task({ todo, user_id:userId });

    await newTask.save();

    // Redirect the user back to the dashboard after creating the task
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })

})

  const deleteTask = async(req, res)=>{
    const {taskId} = req.params
    try {
      await Task.findByIdAndRemove(taskId)
      res.redirect('/dashboard')
    } catch (error) {
      console.log(error);
      res.status(500).send(`am error occured`)
    }
  }
  

  const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { todo, completed } = req.body;
  
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).send('Task not found');
      }
      task.todo = todo;
      task.completed = !!completed; 
  
      await task.save();
  
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  };
  

// const deleteTask = asyncWrapper(async (req, res, next) => {
//   const { id: taskID } = req.params
//   const task = await Task.findOneAndDelete({ _id: taskID })
//   if (!task) {
//     return next(createCustomError(`No task with id : ${taskID}`, 404))
//   }
//   res.status(200).json({ task })
// })
// const updateTask = asyncWrapper(async (req, res, next) => {
//   const { id: taskID } = req.params

//   const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//     new: true,
//     runValidators: true,
//   })

//   if (!task) {
//     return next(createCustomError(`No task with id : ${taskID}`, 404))
//   }

//   res.status(200).json({ task })
// })

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
