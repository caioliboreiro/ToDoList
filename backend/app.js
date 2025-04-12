const express = require("express");
const app = express();
const todoRouter = require("./routes/todoRouter");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/", todoRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
