const jwt = require("jsonwebtoken");

const isCustomerLoggedIn = (req, res, next) => {
  var token = req.headers.token || req.body.token;

  // console.log(token);

  if (!token) {
    return res.json({ status: "MISSING_TOKEN", message: "Token is missing." });
  }

  try {
    var payLoad = jwt.verify(token, process.env.TOKEN_KEY);
    req.Customer_id = payLoad.Customer_id;
    next();
  } catch (error) {
    return res.json({
      status: "EXPIRED_TOKEN",
      message: "Token has been expired",
      error,
    });
  }
};
module.exports = isCustomerLoggedIn;