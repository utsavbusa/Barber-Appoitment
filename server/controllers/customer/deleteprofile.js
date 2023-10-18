const User = require("../../models/Customer");

exports.deleteprofile = async (req, res) => {
  try {
    var data = await User.deleteOne({ _id: req.Customer_id });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", data });
};
