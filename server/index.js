require("dotenv").config();
const cors = require("cors");
require("./config/database").connect();
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//make authecation varible fome routes
const authentication = require("./routes/authentication");

app.use("/api/v1/authentication", authentication);

app.get("/", (req, res) => {
  console.log("Hello world received a request.");
  res.send("hello frome barber");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("\n------------------START-----------------------\n");
  console.log(
    "%s\x1b[36m\x1b[1m%d\x1b[0m",
    "server is runing on port : ",
    process.env.SERVER_PORT
  );
});
