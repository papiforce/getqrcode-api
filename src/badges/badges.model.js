const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const badgeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  picture: {
    type: String,
    trim: true,
    required: true,
  },
  isDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  rank: {
    type: String,
    required: true,
    enum: ["BRONZE", "SILVER", "GOLD", "PLATINUM"],
  },
  coordinates: {
    type: { latitude: Number, longitude: Number },
    required: true,
  },
});

const BadgeModel = model("Badge", badgeSchema);

module.exports = BadgeModel;
