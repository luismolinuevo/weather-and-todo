const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening at localhost:8080");
});
