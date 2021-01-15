const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  diatery: {
    type: String,
    required: true,
    default: "Non-Veg"
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
