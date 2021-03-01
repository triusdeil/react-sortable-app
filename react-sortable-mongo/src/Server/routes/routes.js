const {Router} = require('express')
const router = Router()
const Task = require('../models/Task')

router.post('/tasks', async(req,res) =>{
    console.log(req.body)
    const newTask = new Task(req.body)
    newTask.sorting = await Task.estimatedDocumentCount()
    newTask.save();
    res.json(newTask);
})

router.get('/tasks', async (req,res) => {
    const tasks = await Task.find()
    res.json(tasks)
})

router.put('/tasks', async(req,res) =>{
    console.log(req.body)
    const taskIds = req.body;
    for(const [i,id] of taskIds.entries()){
        await Task.updateOne({_id:id},{sorting: i})
    }
    res.json({message: 'the lis was ordered'})
})
module.exports = router