# Organic Store E-commerce Platform

A modern e-commerce platform specializing in organic and eco-friendly products, built with Next.js, Node.js, and MongoDB.

## 🌟 Features

### 🛍️ Customer Features
- Shopping cart functionality with real-time updates
- Wishlist for saving favorite items
- Secure user authentication and profile management
- Streamlined checkout process
- Product search with advanced filtering
- Order tracking and history
- User reviews and ratings
- Responsive design for all devices

### 👑 Admin Features
- Comprehensive dashboard with sales analytics
- Product inventory management
- User management system
- Order processing and tracking
- Content management for banners and promotions
- Sales reports and insights

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- React Hook Form
- Zod validation

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT authentication
- Bcrypt
- Cloudinary
- Stripe payments

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/MR-PROFESSOR-790/organin-store-E
cd organin-store-E
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
# Create .env.local file in root directory
NEXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_URL=your_cloudinary_url
```

4. Run the development server
```bash
pnpm dev
```

## 📁 Project Structure

```
organin-store-E/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── (shop)/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   └── shared/
├── lib/
│   ├── utils/
│   └── config/
├── public/
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

## 🚀 Key Features

### Authentication
- JWT-based authentication
- Social login integration
- Password reset functionality
- Role-based access control

### Shopping Experience
- Real-time cart updates
- Secure payment processing
- Order tracking
- Multiple payment methods
- Wishlist management

### Admin Dashboard
- Sales analytics
- Inventory management
- User management
- Order processing
- Content management

## 🔒 Security

- JWT authentication
- Password hashing
- Input sanitization
- Rate limiting
- CORS protection
- XSS prevention

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## 📝 API Documentation

API endpoints are documented using Swagger UI at `/api-docs` when running in development mode.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - 

## 📧 Contact


Project Link: https://github.com/MR-PROFESSOR-790/organin-store-E

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for database
- All contributors who have helped this project grow
