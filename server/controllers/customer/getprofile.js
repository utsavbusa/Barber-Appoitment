const User = require("../../models/Customer");

exports.getprofile = async (req, res) => {
    try {
      var data = await User.find({ _id: req.Customer_id });
    } catch (error) {
      return res.json({ status: "X", message: "something went wrong." });
    }

    res.json({ status: "OK", data });
}