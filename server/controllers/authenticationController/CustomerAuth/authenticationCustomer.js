const Customer = require("../../../models/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ------------------- Sing in -----------------------
exports.SignIn = async (req, res) => {
  var { name, email, password, cpassword, number } = req.body;

  if (!(name && email && password && cpassword && number)) {
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

  if (await Customer.findOne({ email })) {
    return res.json({ status: "EXISTS", message: "Customer allrady exist." });
  }

  try {
    var data = await Customer.create({ name, email, password, number });
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
exports.LogIn = async (req, res) => {
  var { email, password } = req.body;

  if (!(email && password)) {
    return res.json({
      status: "MISSING_FIELD",
      message: "all fileds are required.",
    });
  }

  var data = await Customer.findOne({ email });

  if (!data) {
    return res.json({
      status: "NOT_EXIST",
      message: "Customer does not exist",
    });
  }

  if (await bcrypt.compare(password, data.password)) {
    var token = jwt.sign(
      { Customer_id: data._id, email, name: data.name, number: data.number },
      process.env.TOKEN_KEY,
      { expiresIn: "5h" }
    );
    res.json({ status: "OK", token });
  } else {
    res.json({ status: "INVALID_PW", message: "password is invalid." });
  }
};

// =============================================================
