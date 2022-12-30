const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), // normalizeEmail means... UzairAsim@gmail.com => uzairasim@gmail.com
    check("password").isLength({ min: 8 }),
  ],
  usersControllers.signup
);

router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").isLength({ min: 8 })],
  usersControllers.login
);

module.exports = router;
