const jwt = require("jsonwebtoken");

const isShopOwnerLoggedIn = (req, res, next) => {
  var token = req.headers.token || req.body.token;

  console.log(req.headers.token);
  if (!token) {
    return res.json({ status: "MISSING_TOKEN", message: "Token is missing." });
  }

  try {
    var payLoad = jwt.verify(token, process.env.TOKEN_KEY);
    req.ShopOwner_id = payLoad.ShopOwner_id;
    next();
  } catch (error) {
    return res.json({
      status: "EXPIRED_TOKEN",
      message: "Token has been expired",
      error,
    });
  }
};
module.exports = isShopOwnerLoggedIn;
