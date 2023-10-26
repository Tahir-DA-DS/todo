const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },

  user_id:{type:mongoose.Schema.Types.String,
    ref:"users"
    }
})

module.exports = mongoose.model('Task', TaskSchema)
