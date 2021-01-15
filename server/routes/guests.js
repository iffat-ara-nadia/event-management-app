const Guest = require("../models/Guest");
const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const router = require("express").Router();

router.get("/", auth, async (req, res) => {
  const guests = await Guest.find().sort({ name: 1 });
  res.send(guests);
});

router.get("/:id", auth, async (req, res) => {
  const guest = await Guest.findById(req.params.id);
  if (!guest)
    return res.status(404).send("The guest with the given ID was not found...");
  res.send(guest);
});

router.post("/", auth, async (req, res) => {
  const { name, phone, diatery, isConfirmed } = req.body;
  let guest = new Guest({
    // name: req.body.name,
    // phone: req.body.phone,
    // diatery: req.body.diatery,
    // isConfirmed: req.body.isConfirmed
    name,
    phone,
    diatery,
    isConfirmed
  });

  await guest.save();
  res.send(guest);
});

router.put("/:id", auth, async (req, res) => {
  //NO need to object destructring from req.body here, otherwise you have to make guestObject seperately.
  const guest = await Guest.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      diatery: req.body.diatery,
      isConfirmed: req.body.isConfirmed
    },
    { new: true }
  );

  if (!guest)
    return res.status(404).send("The guest with the given ID was not found...");

  await guest.save();
  res.send(guest);
});

router.delete("/:id", auth, async (req, res) => {
  const guest = await Guest.findByIdAndRemove(req.params.id);
  if (!guest)
    return res.status(404).send("The guest with the given ID was not found...");

  res.send(guest);
});

module.exports = router;
