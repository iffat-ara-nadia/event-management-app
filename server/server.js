const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const guests = require("./routes/guests");
const register = require("./routes/register");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined...");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/party")
  .then(() => console.log("MongoDB connection is establied successfully..."))
  .catch(err => console.err("Couldn't connect to mongoDB.."));

app.use(express.json());
app.use(cors());

app.use("/api/guests", guests);
app.use("/api/register", register);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}...`);
});
