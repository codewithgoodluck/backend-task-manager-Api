const express = require('express')
const router = express.Router()
const {getAllTasks,getTasks,createTasks,deleteTasks,updateTasks} = require('../controller/tasks')

router.route('/').get(getAllTasks).post(createTasks)
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks)

module.exports = router