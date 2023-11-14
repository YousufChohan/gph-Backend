const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
  // wishlist: {
  //   type: Array,
  //   required: false,
  // },
  // profilePicture: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "File",
  //         required: false,
  //     },
  // ],
});

module.exports = mongoose.model("User", UserSchema);
