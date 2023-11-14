const User = require("../models/user");
const Credential = require("../models/credential");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

class SignupController {
  static async Execute(req, res) {
    console.log(req.body);
    const { firstName, lastName, email, mobile, role, password } = req.body;

    if (!firstName || !lastName || !email || !mobile || !role || !password) {
      res.status(400).json({
        message: `Invalid Request`,
      });
    } else {
      console.log(req.body);
      const user = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        role: role.trim(),
      });

      const existingUser = await User.find({
        mobile: mobile,
      });

      if (existingUser.length > 0) {
        res.status(400).json({
          message: `Phone Number is already registered`,
        });
      } else {
        user
          .save()
          .then((response) => {
            if (password) {
              bcrypt.hash(password, saltRounds).then(async function (hash) {
                // Store hash in your password DB.
                const credential = new Credential({
                  user: response._id,
                  mobile: mobile,
                  password: hash,
                  role: "customer",
                  OTP: password,
                });

                credential
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: `user added sucessfully`,
                    });
                  })
                  .catch((err) => {
                    return res.status(400).send(err);
                  });
              });
            } else {
              res.status(400).json({
                message: `Password does not match`,
              });
            }
          })
          .catch((err) => {
            return res.status(400).send(err, response);
          });
      }
    }
  }
}

module.exports = SignupController;
