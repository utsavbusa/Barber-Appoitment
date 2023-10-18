const ShopOwner = require("../../../models/ShopOwner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ------------------- Sing in -----------------------
exports.SignInShopOwner = async (req, res) => {
  var {
    name,
    email,
    password,
    cpassword,
    number,
    address,
    barber,
    services,
  } = req.body;

  



  if (
    !(
      name &&
      email &&
      password &&
      cpassword &&
      number &&
      address &&
      barber && 
      services
    )
  ) {
   
    return res.json({
      status: "MISSING_FIELD",
      messgae: "all fildes are required.",
    });
  }

  if (cpassword !== password) {
    return res.json({
      status: "Pm",
      message: "confirm password should be match.",
    });
  }

  if (await ShopOwner.findOne({ email })) {
    return res.json({ status: "EXISTS", message: "Customer allrady exist." });
  }

  try {
    var data = await ShopOwner.create({
      name,
      email,
      password,
      number,
      address,
      barber,
      services,
    });
  } catch (error) {
    return res.json({
      status: "X",
      message: "something went wrong in creating Customer",
      error,
    });
  }

  data.password = undefined;
  res.json({ status: "OK", data });
};

// ------------------------ Log in ---------------------------
exports.LogInShopOwner = async (req, res) => {
  var { email, password } = req.body;

  if (!(email && password)) {
    return res.json({
      status: "MISSING_FIELD",
      message: "all fileds are required.",
    });
  }

  var data = await ShopOwner.findOne({ email });

  if (!data) {
    return res.json({
      status: "NOT_EXIST",
      message: "Customer does not exist",
    });
  }

  if (await bcrypt.compare(password, data.password)) {
    var token = jwt.sign(
      { ShopOwner_id: data._id, email, name: data.name, number: data.number },
      process.env.TOKEN_KEY,
      { expiresIn: "12h" }
    );
    res.json({ status: "OK", token });
  } else {
    res.json({ status: "INVALID_PW", message: "password is invalid." });
  }
};

// =============================================================
