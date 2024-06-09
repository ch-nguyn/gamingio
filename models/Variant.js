const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: [String],
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Variant", variantSchema);
