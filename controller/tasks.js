const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async")

const getAllTasks = asyncWrapper( async (req, res) => {
 
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  
    // res.status(500).json({ msg: error });

});
const getTasks = asyncWrapper( async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID});
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
const createTasks = asyncWrapper( async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
const updateTasks = asyncWrapper (async(req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    
  })  
  
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
});
const deleteTasks = asyncWrapper ( async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await  Task.findOneAndDelete ({ _id: taskID});
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = {
  getAllTasks,
  getTasks,
  deleteTasks,
  updateTasks,
  createTasks,
};
