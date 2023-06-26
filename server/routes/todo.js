const express = require("express");
const { Todo } = require('../models');

const router = express.Router();

//get all todos
router.get("/", async (req, res) => {
    try {
        const fetchTodos = await Todo.findAll();

        res.status(200).json({
            success: true,
            fetchTodos
        })
    } catch(err) {
        console.log("Error fetching todos" + err)
    }
})

//creates a new post
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