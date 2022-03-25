require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/notesRouter");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

// database connection
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("db con ok");
  })
  .catch((error) => console.log(error));

// below mongoDB and above listen port
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "bulid", "index.html"));
  });
}

// listen server
const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`server is listening on port: ${port}`);
});
