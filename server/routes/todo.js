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

//delete todo by id
router.delete("/:id", async (req, res) => {
    const todoId = req.params.id;

    const deleteTodo = await Todo.destroy({
        where: {
            id: todoId
        }
    });

    res.status(200).json({
        success: true
    })
})

module.exports = router;