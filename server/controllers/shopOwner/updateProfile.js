const User = require("../../models/ShopOwner");

exports.updateProfile = async (req, res) => {
  var { name, email, shopname, number, address, barber, services } = req.body;

  if (!(name && email && shopname && number && address && barber && services)) {
    return res.json({
      status: "MISSING_FIELD",
      message: "all fileds are required.",
    });
  }

  if (await User.findOne({ email: email })) {
    return res.json({
      status: "EXIST",
      message: "this number is already assigned.",
    });
  }
  try {
    var data = await User.updateOne({ email: email }, { $set: {} });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }
};
