const express = require("express");
const router = express.Router();
const isShopOwnerLoggedIn = require("../middlewares/isShopOwnerLoggedIn");


const { getprofile } = require("../controllers/shopOwner/getprofile");
const { deleteprofile } = require("../controllers/shopOwner/deleteprofile");
const { updateProfile } = require("../controllers/shopOwner/updateProfile");
const { customerlist } = require("../controllers/shopOwner/customerlist");
const { updatecustomerlist } = require("../controllers/shopOwner/customerlist");
const { addcustomerlist } = require("../controllers/shopOwner/customerlist");

router.route("/getprofile").get(isShopOwnerLoggedIn, getprofile);
router.route("/updateprofile").post(isShopOwnerLoggedIn, updateProfile);
router.route("/customerlist").get(isShopOwnerLoggedIn, customerlist);
router.route("/updatecustomerlist").post(isShopOwnerLoggedIn, updatecustomerlist);
router.route("/addcustomerlist").post(isShopOwnerLoggedIn, addcustomerlist);

module.exports = router;

/**
 * update profile
 *              -> add shop name
 *              -> add pincode number
 *              -> add address
 *              -> add services with or without price
 * add customer
 * delete customer
 *
 */
