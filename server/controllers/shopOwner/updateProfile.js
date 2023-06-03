const User = require("../../models/Customer");

exports.updateProfile = async (req, res) => {
  var { shopName, pincode, address, services, email } = req.body;

  if (!(shopName && pincode && address && services && email)) {
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
  } catch {}
};
