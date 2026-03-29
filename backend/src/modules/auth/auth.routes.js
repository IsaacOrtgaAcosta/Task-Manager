const express = require('express');
const router = express.Router();

const asyncHandler = require("../../utils/asyncHandler");
const { login, logup } = require("./auth.service");

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

router.post(
    "/logup",
    asyncHandler(async (req, res) =>  {
        const {email, name, lastName, password} = req.body;
        const result = await logup(email, name, lastName, password);
        res.status(200).json(result);
    })
)

module.exports = router;