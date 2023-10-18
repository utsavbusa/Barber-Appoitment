const express = require("express");
const router = express.Router();

const isCustomerLoggedIn = require("../middlewares/isCustomerLoggedIn");

const { getprofile } = require("../controllers/customer/getprofile");
const { updateProfile } = require("../controllers/customer/updateprofile");
const {deleteprofile} = require("../controllers/customer/deleteprofile");
const {getshoplist} = require("../controllers/customer/getshoplist");
const { bookAppoitment } = require("../controllers/customer/bookAppoitment");

router.route("/getprofile").get(isCustomerLoggedIn, getprofile);
router.route("/updateprofile").post(isCustomerLoggedIn, updateProfile);
console.log('customer routes');
router.route("/bookAppoitment").post(isCustomerLoggedIn, bookAppoitment);
router.route("/shoplist").get(isCustomerLoggedIn,getshoplist);

module.exports = router;