const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/User");
const auth = require("../middleware/auth");
const router = require("express").Router();

//Get info about current authenticated user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//Register a new User
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Another kind of validation to make sure this user isn't already registered.
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This user is already registered..");

  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") //to access the token from front end, this line is required.
    .send(_.pick(user, ["_id", "name", "email", "password"]));
});

module.exports = router;
