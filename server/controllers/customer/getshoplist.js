
const User = require("../../models/ShopOwner");

exports.getshoplist = async (req, res) => {
  try {
    var data = await User.find({});
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }
  res.json({ status: "OK", data });
};