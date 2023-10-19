const User = require("../../models/Customer");

// ------------------- get Customer list -----------------------
exports.customerlist = async (req, res) => {
  try {
    var data = await User.find({ isBooked: 'TRUE', shopId: req.ShopOwner_id });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }
    data.map((item) => { item.password = undefined; });
  res.json({ status: "OK", data });
};

// ------------------- update Customer list -----------------------
exports.updatecustomerlist = async (req, res) => {
  try {
    update = {
      $unset: {
        ['shopId']: 1,
      },
      $set: {
        isBooked: "FALSE"
      }
    };
    var data = await User.findByIdAndUpdate(req.params.Customer_id, update, { new: true });
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }
  res.json({ status: "OK", message: "Customer updated successfully."});
};

// ------------------- add Customer list -----------------------
exports.addcustomerlist = async (req, res) => {
  var { name, number } = req.body;
  try {
      var tempData = await User.find({name,number});
      var data = {};
      if(tempData.length > 0){
          data = await User.findByIdAndUpdate(tempData._id, {isBooked:"TRUE",shopId:req.ShopOwner_id}, { new: true });
      }
      else{
        data = await User.create({
        name,
        number,
        isBooked: "TRUE",
        shopId: req.ShopOwner_id,
      });
  }
  } catch (error) {
    return res.json({ status: "X", message: "something went wrong." });
  }

  res.json({ status: "OK", message: "Customer added successfully.",data });
};

//nde font souce code pro