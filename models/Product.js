const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    photo: [String],
    inventory: {
      type: Number,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: [mongoose.Types.ObjectId],
      ref: "Category",
      required: true,
    },
    tag: {
      type: [mongoose.Types.ObjectId],
      ref: "Tag",
      required: true,
    },
    brand: {
      type: [mongoose.Types.ObjectId],
      ref: "Brand",
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

productSchema.pre("save", (next) => {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

module.exports = mongoose.model("Product", productSchema);
