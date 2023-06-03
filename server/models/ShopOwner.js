const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  number: String,
  address: String,
  barber: String,
  services: {
    type: [String],
    default: ["haircutting"],
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 7);
  }
});

module.exports = mongoose.model("ShopOwner", schema);
