const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const { getTasksByUser } = require('./tasks.service');
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

module.exports = router;