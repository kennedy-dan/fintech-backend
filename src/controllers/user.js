const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user) return res.status(400).json({ msg: "user already exist" });
    console.log(req)
    const { first_name, last_name, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      first_name,
      last_name,
      email,
      hash_password,
    });

    _user.save((err, data) => {
      if (err) return res.status(400).json({ err });
      if (data)
        return res.status(201).json({ user: "user created successsfully" });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      console.log(user)
      const promise = await user.authenticate(req.body.password);

      if (promise) {
        const token = jwt.sign(
          { _id: user._id },
          process.env.TOKEN_KEY,
          {}
        );
        const { _id, first_name, last_name, email, role, } = user;
        res.status(200).json({
          token,
          user: { _id, first_name, last_name, email, role, },
        });
      } else {
        return res.status(400).json({ msg: "invalid password" });
      }
    } else {
      return res.status(400).json({ msg: "something went wrong" });
    }
  });
};