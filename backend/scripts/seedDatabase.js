const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../models/User")
const Product = require("../models/Product")
const connectDB = require("../config/database")

const seedData = async () => {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@organicstore.com",
      password: process.env.ADMIN_PASSWORD || "admin123456",
      role: "admin",
    })

    // Create sample users
    const sampleUsers = await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone: "+1234567890",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        phone: "+1234567891",
      },
    ])

    console.log("👥 Created users")

    // Create sample products
    const sampleProducts = [
      {
        name: "Organic Avocados",
        description:
          "Fresh, creamy organic avocados sourced from sustainable farms. Perfect for salads, toast, or smoothies.",
        price: 12.99,
        sku: "APL006",
        originalPrice: 15.99,
        category: "fresh-produce",
        images: [
          { url: "/placeholder.svg?height=500&width=500", isPrimary: true },
          { url: "/placeholder.svg?height=500&width=500" },
        ],
        stock: 45,
        features: ["100% Organic", "Sustainably Sourced", "Rich in Healthy Fats", "No Pesticides"],
        isFeatured: true,
        rating: { average: 4.8, count: 124 },
      },
      {
        name: "Fresh Spinach",
        description: "Crisp, nutrient-rich organic spinach leaves. Great for salads, smoothies, and cooking.",
        price: 4.99,
        sku: "APL005",
        category: "fresh-produce",
        images: [{ url: "/placeholder.svg?height=500&width=500", isPrimary: true }],
        stock: 23,
        features: ["Organic", "High in Iron", "Fresh Daily", "Locally Sourced"],
        rating: { average: 4.6, count: 89 },
      },
      {
        name: "Organic Quinoa",
        description: "Premium organic quinoa grain, perfect for healthy meals and salads.",
        price: 18.99,
        sku: "APL004",
        originalPrice: 22.99,
        category: "pantry",
        images: [{ url: "/placeholder.svg?height=500&width=500", isPrimary: true }],
        stock: 67,
        features: ["Complete Protein", "Gluten-Free", "Organic", "High Fiber"],
        isFeatured: true,
        rating: { average: 4.9, count: 156 },
      },
      {
        name: "Almond Milk",
        description: "Creamy, unsweetened organic almond milk. Perfect for cereals, coffee, and baking.",
        price: 6.99,
        sku: "APL003",
        category: "dairy",
        images: [{ url: "/placeholder.svg?height=500&width=500", isPrimary: true }],
        stock: 89,
        features: ["Unsweetened", "Organic Almonds", "No Additives", "Lactose-Free"],
        rating: { average: 4.7, count: 203 },
      },
      {
        name: "Organic Bananas",
        description: "Sweet, ripe organic bananas. Great for snacking, smoothies, and baking.",
        price: 3.99,
        sku: "APL002",
        category: "fresh-produce",
        images: [{ url: "/placeholder.svg?height=500&width=500", isPrimary: true }],
        stock: 156,
        features: ["Organic", "High Potassium", "Natural Energy", "Fair Trade"],
        rating: { average: 4.5, count: 78 },
      },
      {
        name: "Coconut Oil",
        description: "Extra virgin organic coconut oil. Perfect for cooking, baking, and skincare.",
        price: 14.99,
        sku: "APL001",
        originalPrice: 17.99,
        category: "pantry",
        images: [{ url: "/placeholder.svg?height=500&width=500", isPrimary: true }],
        stock: 34,
        features: ["Extra Virgin", "Cold-Pressed", "Organic", "Multi-Purpose"],
        rating: { average: 4.8, count: 145 },
      },
    ]

    await Product.create(sampleProducts)

    console.log("🥬 Created products")
    console.log("✅ Database seeded successfully!")
    console.log(`👤 Admin login: ${adminUser.email} / ${process.env.ADMIN_PASSWORD || "admin123456"}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedData()
