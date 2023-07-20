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

// {
//   "name": "Venus de Milo",
//   "description": "On connait tous, j'ai qu'ça qu'à dire.",
//   "picture": "https://cloudfront-eu-central-1.images.arcpublishing.com/leparisien/UWZHMQ2HPFF6BPSVWT4AVZLNVI.jpg",
//   "rank": "SILVER",
//   "coordinates": {
//     "latitude": 48.864824,
//     "longitude": 2.334595
//   }
// }
