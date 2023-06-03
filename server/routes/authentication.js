const express = require("express");
const router = express.Router();

const {
  SignIn,
  LogIn,
} = require("../controllers/authenticationController/CustomerAuth/authenticationCustomer");

router.route("/customer/SignIn").post(SignIn);
router.route("/customer/LogIn").post(LogIn);

const {
  SignInShopOwner,
  LogInShopOwner,
} = require("../controllers/authenticationController/ShopownerAuth/authenticationShopowner");
router.route("/shopowner/SignIn").post(SignInShopOwner);
router.route("/shopowner/LogIn").post(LogInShopOwner);
module.exports = router;
