const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const {todo, sequelize} = require("./models")
dotenv.config();

const todoRouter = require("./routes/todo.js")

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));

app.use("/todo", todoRouter);

const PORT = process.env.PORT || 8080;

// db.sequelize.sync().then((req) => {
  app.listen(PORT, async () => {
    await sequelize.authenticate()
    console.log("Server is listening at localhost:8080");
  });
// });
