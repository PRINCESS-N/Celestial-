const bcrypt = require("bcrypt");
const joi = require("joi");
const userModel = require("../models/usermodel");
const config = require("config");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const debug = require("debug")("Result");

const register = async (req, res) => {
  const check = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const validity = check.validate(req.body);
  if (validity.error) {
    return res.status(400).json({message:validity.error.details[0].message});
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const salt = config.get("bcrypt.salt");
  const hashed_password = await bcrypt.hash(data.password, salt);
  const result = await userModel.create({
    username: data.username,
    email: data.email,
    password: hashed_password,
  });
  debug(result);
  const payload = {
    username: req.body.username,
    userId: user._id,
  };
  const secret = config.get("jwt.secret");
  const token = jwt.sign(payload, secret);
  return res
    .status(200)
    .json({
      _id: result._id,
      name: result.username,
      email: result.email,
      token,
    });
};

const login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const validity = schema.validate(req.body);
  if (validity.error) {
    return res.status(400).json({message:validity.error.details[0].message});
  }
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await userModel.findOne({ email: data.email });
  debug("user found");
  if(!user){
    return res.status(400).json({message:"User not found"});
  }
  if (user) {
    const password = await bcrypt.compare(data.password, user.password);
    debug("password");
    if (!password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = {
      username: data.email,
      userId: user._id,
    };
    const secret = config.get("jwt.secret");
    const token = jwt.sign(payload, secret);
    res
      .status(200)
      .json({ _id: user._id, name: user.username, email: data.email, token });
  }
};

const findUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
    console.log("users found");
  } catch (error) {
    console.log(error);
  }
};
const user = async (req, res) => {
  const info = req.params.userId;
  const user = await userModel.findById(info);
  debug(`${user} user got`);
  res.send(user);
};

module.exports = { register, login, findUsers, user };
