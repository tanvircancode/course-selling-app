// working properly
//my code starts from here hard.js
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors');
const adminRouter  = require("./routes/admin");
const userRouter  = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

mongoose.connect(
  "mongodb+srv://tanvirxahm:2wr2dnu9Ytq98Xro@cluster0.cd4afbe.mongodb.net/courses",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
