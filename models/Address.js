const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  ward: {
    type: String,
  },
  detailAddress: String,
  zipcode: String,
  country: String,
  user: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema);
