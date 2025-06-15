const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const asyncHandler = require("../utils/asyncHandler")

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const { period = "30" } = req.query // days
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - Number.parseInt(period))

  // Basic counts
  const totalUsers = await User.countDocuments({ isActive: true })
  const totalProducts = await Product.countDocuments({ isActive: true })
  const totalOrders = await Order.countDocuments()

  // Revenue calculation
  const revenueData = await Order.aggregate([
    {
      $match: {
        status: { $in: ["delivered", "shipped"] },
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$pricing.total" },
        averageOrderValue: { $avg: "$pricing.total" },
      },
    },
  ])

  const revenue = revenueData[0] || { totalRevenue: 0, averageOrderValue: 0 }

  // Orders by status
  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ])

  // Recent orders
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("user", "name email")
    .select("orderNumber user status pricing.total createdAt")

  // Sales data for chart (last 30 days)
  const salesData = await Order.aggregate([
    {
      $match: {
        status: { $in: ["delivered", "shipped"] },
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        sales: { $sum: "$pricing.total" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ])

  // Top selling products
  const topProducts = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        name: "$product.name",
        totalSold: 1,
        revenue: 1,
        image: { $arrayElemAt: ["$product.images.url", 0] },
      },
    },
  ])

  // Low stock products
  const lowStockProducts = await Product.find({
    isActive: true,
    stock: { $lt: 10 },
  })
    .select("name stock sku")
    .sort({ stock: 1 })
    .limit(10)

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: revenue.totalRevenue,
        averageOrderValue: revenue.averageOrderValue,
      },
      ordersByStatus,
      recentOrders,
      salesData,
      topProducts,
      lowStockProducts,
    },
  })
})

// @desc    Get sales analytics
// @route   GET /api/dashboard/analytics/sales
// @access  Private/Admin
const getSalesAnalytics = asyncHandler(async (req, res) => {
  const { period = "30", groupBy = "day" } = req.query
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - Number.parseInt(period))

  let dateFormat
  switch (groupBy) {
    case "hour":
      dateFormat = "%Y-%m-%d %H:00"
      break
    case "day":
      dateFormat = "%Y-%m-%d"
      break
    case "week":
      dateFormat = "%Y-W%U"
      break
    case "month":
      dateFormat = "%Y-%m"
      break
    default:
      dateFormat = "%Y-%m-%d"
  }

  const salesAnalytics = await Order.aggregate([
    {
      $match: {
        status: { $in: ["delivered", "shipped"] },
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: dateFormat, date: "$createdAt" },
        },
        revenue: { $sum: "$pricing.total" },
        orders: { $sum: 1 },
        averageOrderValue: { $avg: "$pricing.total" },
      },
    },
    { $sort: { _id: 1 } },
  ])

  res.status(200).json({
    success: true,
    data: {
      analytics: salesAnalytics,
    },
  })
})

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
}
