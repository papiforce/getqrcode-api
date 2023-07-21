const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  isDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
  picture: {
    type: String,
    required: false,
    trim: true,
    default: null,
  },
  roles: {
    type: [String],
    required: true,
    enum: ["MEMBER", "ADMIN"],
    default: "MEMBER",
  },
  badges: {
    type: [Types.ObjectId],
    required: false,
    ref: "Badge",
    default: null,
  },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
