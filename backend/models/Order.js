const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: String,
        sku: String,
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "United States",
      },
    },
    billingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: "United States",
      },
      sameAsShipping: {
        type: Boolean,
        default: true,
      },
    },
    paymentInfo: {
      method: {
        type: String,
        required: true,
        enum: ["card", "paypal", "apple-pay", "google-pay"],
      },
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
      transactionId: String,
      paymentDate: Date,
    },
    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },
      tax: {
        type: Number,
        required: true,
        min: 0,
      },
      shipping: {
        type: Number,
        default: 0,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    tracking: {
      carrier: String,
      trackingNumber: String,
      trackingUrl: String,
      estimatedDelivery: Date,
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    notes: {
      customer: String,
      admin: String,
    },
    couponCode: String,
    isGift: {
      type: Boolean,
      default: false,
    },
    giftMessage: String,
    deliveryInstructions: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes
orderSchema.index({ user: 1, createdAt: -1 })
orderSchema.index({ orderNumber: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ "paymentInfo.status": 1 })

// Virtual for order age
orderSchema.virtual("orderAge").get(function () {
  const now = new Date()
  const diffTime = Math.abs(now - this.createdAt)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

// Pre-save middleware to generate order number
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substr(2, 5).toUpperCase()
    this.orderNumber = `ORD-${timestamp.slice(-6)}${random}`
  }
  next()
})

// Method to add status update
orderSchema.methods.updateStatus = function (newStatus, note = "", updatedBy = null) {
  this.status = newStatus
  this.statusHistory.push({
    status: newStatus,
    note,
    updatedBy,
    timestamp: new Date(),
  })
  return this.save()
}

// Method to calculate total
orderSchema.methods.calculateTotal = function () {
  const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  this.pricing.subtotal = subtotal
  this.pricing.total = subtotal + this.pricing.tax + this.pricing.shipping - this.pricing.discount
  return this.pricing.total
}

module.exports = mongoose.model("Order", orderSchema)
