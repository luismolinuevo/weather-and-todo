import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Server is listening at localhost:8080");
});