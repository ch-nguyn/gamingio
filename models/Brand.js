const mongoose = require("mongoose");
const slugify = require("slugify");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

brandSchema.pre("save", (next) => {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Brand", brandSchema);
