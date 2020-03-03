const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  createCustomer,
  loginCustomer,
  getCustomer,
  editCustomerInfo,
  updatePassword,
} = require("../controllers/customers");



router.post("/", createCustomer);


router.post("/login", loginCustomer);


router.get(
  "/customer",
  passport.authenticate("jwt", { session: false }),
  getCustomer
);


router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  editCustomerInfo
);


router.put(
  "/password",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);


module.exports = router;
