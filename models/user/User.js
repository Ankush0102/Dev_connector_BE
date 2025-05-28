const mongoose = require("mongoose");

const generateUid = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit unique ID
};

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true, default: generateUid },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
