const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: {
        values: ["fresh-produce", "pantry", "dairy", "snacks", "beverages", "personal-care", "household"],
        message: "Please select a valid category",
      },
    },
    subcategory: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: [true, "Please provide a SKU"],
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ["kg", "g", "lb", "oz"],
        default: "kg",
      },
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "in"],
        default: "cm",
      },
    },
    features: [String],
    tags: [String],
    isOrganic: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          maxlength: [500, "Review comment cannot exceed 500 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    nutritionInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
      sugar: Number,
      sodium: Number,
    },
    certifications: [
      {
        name: String,
        image: String,
      },
    ],
    supplier: {
      name: String,
      contact: String,
      location: String,
    },
    seoData: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better performance
productSchema.index({ name: "text", description: "text" })
productSchema.index({ category: 1, isActive: 1 })
productSchema.index({ price: 1 })
productSchema.index({ "rating.average": -1 })
productSchema.index({ isFeatured: 1, isActive: 1 })

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
  }
  return 0
})

// Virtual for availability status
productSchema.virtual("availability").get(function () {
  if (this.stock > 10) return "in-stock"
  if (this.stock > 0) return "low-stock"
  return "out-of-stock"
})

// Update rating when reviews change
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating.average = 0
    this.rating.count = 0
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating.average = Number((totalRating / this.reviews.length).toFixed(1))
    this.rating.count = this.reviews.length
  }
  return this.save()
}

// Pre-save middleware to generate SKU if not provided
productSchema.pre("save", function (next) {
  if (!this.sku) {
    this.sku = `ORG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  }
  next()
})

module.exports = mongoose.model("Product", productSchema)
