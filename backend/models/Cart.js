const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Index for better performance
cartSchema.index({ user: 1 })
cartSchema.index({ "items.product": 1 })

// Virtual for cart summary
cartSchema.virtual("summary").get(function () {
  return {
    itemCount: this.totalItems,
    subtotal: this.totalPrice,
    tax: this.totalPrice * 0.08, // 8% tax
    total: this.totalPrice * 1.08,
  }
})

// Pre-save middleware to calculate totals
cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0)
  this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  this.lastModified = new Date()
  next()
})

// Method to add item to cart
cartSchema.methods.addItem = function (productId, quantity, price) {
  const existingItem = this.items.find((item) => item.product.toString() === productId.toString())

  if (existingItem) {
    existingItem.quantity += quantity
    existingItem.price = price // Update price in case it changed
  } else {
    this.items.push({
      product: productId,
      quantity,
      price,
    })
  }

  return this.save()
}

// Method to remove item from cart
cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter((item) => item.product.toString() !== productId.toString())
  return this.save()
}

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function (productId, quantity) {
  const item = this.items.find((item) => item.product.toString() === productId.toString())

  if (item) {
    if (quantity <= 0) {
      return this.removeItem(productId)
    } else {
      item.quantity = quantity
      return this.save()
    }
  }

  throw new Error("Item not found in cart")
}

// Method to clear cart
cartSchema.methods.clearCart = function () {
  this.items = []
  return this.save()
}

module.exports = mongoose.model("Cart", cartSchema)
