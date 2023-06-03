const User = require("../../models/ShopOwner");

exports.deleteprofile = async (req, res) => {
  try {
    var data = await User.deleteOne({ _id: req.ShopOwner_id });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", message: "Profile deleted successfully." });
};
