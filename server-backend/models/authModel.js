const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Use of schema to require email and password
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

/**
 * Encypts the password taken as a input in the register section
 */
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * 
 * @param {Compare email in the input login with the email saved in mongodb} email 
 * @param {Compare email in the input password with the password saved in mongodb*} password 
 * @returns 
 */
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

module.exports = mongoose.model("Users", userSchema);