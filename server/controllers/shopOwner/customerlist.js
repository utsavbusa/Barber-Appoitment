const User = require("../../models/Customer");

// ------------------- get Customer list -----------------------
exports.customerlist = async (req, res) => {
  try {
    var data = await User.find({ isBooked: true, shopId: req.params.id });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", data });
};

// ------------------- update Customer list -----------------------
exports.updatecustomerlist = async (req, res) => {
  try {
    var data = await User.updateOne(
      { _id: req.params.id },
      { $set: { isBooked: false } }
    );
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", message: "Customer updated successfully." });
};

// ------------------- add Customer list -----------------------
exports.addcustomerlist = async (req, res) => {
  var { name, number } = req.body;
  try {
    var data = await User.create({
      name,
      number,
      isBooked: true,
      shopId: req.params.id,
    });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", message: "Customer added successfully." });
};
