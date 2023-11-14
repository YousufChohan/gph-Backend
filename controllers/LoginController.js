const Credential = require("../models/credential");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class LoginController {
  static async Execute(req, res) {
    console.log(req.body);
    const { mobile, password } = req.body;

    if (mobile != undefined && password != undefined) {
      const existingUser = await Credential.findOne({
        mobile: mobile.trim(),
      });
      console.log(existingUser);
      if (existingUser) {
        const user = await User.find({ _id: existingUser.user });

        console.log("user", user);
        await bcrypt
          .compare(password.trim(), existingUser.password)
          .then(function (result) {
            if (result == true) {
              const token = jwt.sign(
                JSON.stringify({
                  _id: existingUser._id,
                  role: existingUser.role,
                }),
                process.env.ACCESS_TOKEN_JWT
              );
              res.setHeader("x-auth-token", token);

              res.status(200).send({
                message: "Login Successful",
                mobile: existingUser.mobile,
                role: existingUser.role,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                _id: user[0]._id,
                token: token,
                isVerified: user[0].isVerified,
              });
            } else {
              res.status(400).send({
                message: "Invalid credentials",
              });
            }
          });
      } else {
        res.status(403).send({
          message: "No user found",
        });
      }
    } else {
      res.status(400).send({
        message: "Invalid request",
      });
    }
  }
}

module.exports = LoginController;
