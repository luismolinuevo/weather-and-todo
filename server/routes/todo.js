const express = require("express");
const { Todo } = require('../models');

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {description} = req.body;

        const newTodo = await Todo.create({
            description: description,
            complete: false
        });

        res.status(201).json({
            succuess: true,
            newTodo
        })
    } catch(err) {
        console.log("Error creating todo")
    }
})

module.exports = router;