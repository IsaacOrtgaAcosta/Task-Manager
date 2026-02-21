const express = require('express');
const router = express.Router();

const asyncHandler = require("../../utils/asyncHandler");
const { login } = require("./auth.service");

router.get("/", (_req, res) => {
    res.json({ message: "auth ok"});
})

router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.status(200).json(result);
    })
);

module.exports = router;