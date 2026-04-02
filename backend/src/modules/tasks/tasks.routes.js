const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const { getTasksByUser, getTaskByTaskId, deleteTaskById, updateTaskById, saveNewTask } = require('./tasks.service');
const authRequired = require('../../middlewares/authRequired');

router.use(authRequired);

router.get(
    '/', 
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const result = await getTasksByUser(userId);
        res.status(200).json(result);
    })
);

router.get(
    '/:id',
    asyncHandler(async(req, res) => {
        const userId = req.user.id;
        const taskId = req.params.id;
        const result = await getTaskByTaskId(taskId, userId);
        res.status(200).json(result);
    })
)

router.delete(
    '/:id',
    asyncHandler(async(req, res) => {
        const userId = req.user.id;
        const taskId = req.params.id;
        const result = await deleteTaskById(taskId, userId);
        res.status(200).json(result);
    })
)

router.patch(
    '/:id',
    asyncHandler(async(req, res) => {
        const userId = req.user.id;
        const taskId = req.params.id;
        const updates = req.body;
        const result = await updateTaskById(userId, taskId, updates);
        res.status(200).json(result);
    })
)

router.post(
    '/',
    asyncHandler(async(req, res) => {
        const userId = req.user.id;
        const {title, description, startDate, dueDate, priority} = req.body;
        const result = await saveNewTask(title, description, startDate, dueDate, priority, userId);
        res.status(201).json(result);
    })
)

module.exports = router;