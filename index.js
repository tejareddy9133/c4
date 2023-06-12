const express = require("express");
require("dotenv").config();
const { userRouter } = require("./routes/user.route");
const cors = require("cors");
const { connection } = require("mongoose");
const postRoute = require("./routes/post.route");

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/post", postRoute);
app.use(cors());

app.listen(4500, async () => {
  try {
    await connection;
    console.log(`${process.env.port} runnig number of port db is connected`);
  } catch (error) {
    console.log(error);
  }
});
