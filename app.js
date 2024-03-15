const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn");
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());
app.use(cors());
const multer = require('multer');
const User = require("./models/user")
const PORT = process.env.PORT || 1000

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.get('/', async (req, res) => {
  res.send("backend api run....");
});

app.get('/userall', async (req, res) => {
  let data = await User.find()
  res.send(data);
});

app.listen(1000, () => {
  console.log("Server Started");
});
