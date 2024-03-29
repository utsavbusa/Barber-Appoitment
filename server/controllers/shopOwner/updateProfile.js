const User = require("../../models/ShopOwner");

exports.updateProfile = async (req, res) => {
  var { name, email, number, address, barber, services } = req.body;


  if (!(name && email && number && address && barber && services)) {
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
    var data = await User.updateOne({ _id:req.ShopOwner_id }, { $set: {name:name}});
    
  } catch (error) {
    
    return res.json({ status: "X", message: "something went wrong." });
  }
};
