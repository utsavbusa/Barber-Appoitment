const express = require("express");
const router = express.Router();
const isShopOwnerLoggedIn = require("../middlewares/isShopOwnerLoggedIn");

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
