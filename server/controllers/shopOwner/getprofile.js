const Shopowner = require("../../models/ShopOwner");

exports.getprofile = async (req, res) => {
  try {
    var data = await Shopowner.find({ _id: req.ShopOwner_id });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", data });
};
