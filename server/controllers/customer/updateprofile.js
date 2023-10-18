const User = require("../../models/Customer");

exports.updateProfile = async (req, res) => {
  var { name, email, number } = req.body;

  if (!(name && email && number)) {
    return res.json({
      status: "MISSING_FIELD",
      message: "all fileds are required.",
    });
  }

  // if (await User.findOne({ email: email })) {
  //   return res.json({
  //     status: "EXIST",
  //     message: "this number is already assigned.",
  //   });
  // }
  try {
    var data = await User.updateOne({ _id: req.Customer_id }, { $set: { email: email,name:name,email:email} });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.send({ status: "OK", data });
};
