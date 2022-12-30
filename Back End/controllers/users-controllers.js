const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Uzair Asim",
    email: "test@test.com",
    password: "test123",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, Registration Failed", 422));
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    return next(new HttpError("Could not create user, email already exist.", 422));
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};
const login = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    return next(new HttpError("Invalid Inputs Given, Please Input valid data", 422));
  }
  const { email, password } = req.body;
  identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser) {
    return next(HttpError("User Not Found", 401));
  }
  if (identifiedUser.password !== password) {
    return next(new HttpError("Wrong Password"));
  }
  res.status(200).json({ message: "User Logged In" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
