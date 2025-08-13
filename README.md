# Digital Wallet API

A robust and secure digital wallet API built with Node.js, Express, TypeScript, and MongoDB. This API provides comprehensive wallet management functionality with role-based access control for different user types (Admin, Agent, Personal).

## 🚀 Project Overview

The Digital Wallet API is a full-featured financial transaction system that supports:

- **Multi-role User Management**: Admin, Agent, and Personal user types with different permissions
- **Wallet Operations**: Send money, cash-in, cash-out, and top-up functionality
- **Commission System**: Agent commission tracking and management
- **Secure Authentication**: JWT-based authentication with access and refresh tokens
- **Transaction History**: Complete transaction tracking and reporting
- **Role-based Access Control**: Granular permissions for different user types

### Key Features

- 🔐 **Secure Authentication** with JWT tokens
- 👥 **Role-based Authorization** (Admin, Agent, Personal)
- 💰 **Wallet Management** with balance tracking
- 📊 **Transaction Processing** with validation
- 🏦 **Commission System** for agents
- 📈 **Admin Dashboard** with user and transaction management
- ✅ **Input Validation** using Zod schemas
- 🛡️ **Error Handling** with global error management

## 📁 File Structure

```
B5A5/
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── env.ts                 # Environment configuration
│   │   ├── helpers/
│   │   │   ├── AppError.ts            # Custom error handling
│   │   │   └── errorHelpers/
│   │   │       └── handlerZodError.ts # Zod validation error handler
│   │   ├── interfaces/
│   │   │   ├── error.types.ts         # Error type definitions
│   │   │   └── index.d.ts             # Global type declarations
│   │   ├── lib/                       # Library configurations
│   │   ├── middleware/
│   │   │   ├── checkAuth.ts           # Authentication middleware
│   │   │   ├── checkPermission.ts     # Permission checking
│   │   │   ├── globalErrorHandler.ts  # Global error handler
│   │   │   ├── notFound.ts            # 404 handler
│   │   │   └── validateRequest.ts     # Request validation
│   │   ├── modules/
│   │   │   ├── auth/                  # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.validator.ts
│   │   │   ├── commission/            # Commission management
│   │   │   │   ├── commission.model.ts
│   │   │   │   └── commission.types.ts
│   │   │   ├── settings/              # System settings
│   │   │   │   ├── settings.model.ts
│   │   │   │   └── settings.types.ts
│   │   │   ├── systemAccount/         # System account management
│   │   │   │   ├── systemAccount.model.ts
│   │   │   │   └── systemAccount.type.ts
│   │   │   ├── transaction/           # Transaction processing
│   │   │   │   ├── transaction.controllers.ts
│   │   │   │   ├── transaction.model.ts
│   │   │   │   ├── transaction.routes.ts
│   │   │   │   ├── transaction.service.ts
│   │   │   │   ├── transaction.types.ts
│   │   │   │   └── transaction.validate.ts
│   │   │   ├── users/                 # User management
│   │   │   │   ├── admin/             # Admin user functionality
│   │   │   │   ├── agent/             # Agent user functionality
│   │   │   │   ├── personal/          # Personal user functionality
│   │   │   │   └── shared/            # Shared user components
│   │   │   │       └── userBase/
│   │   │   │           ├── userBase.model.ts
│   │   │   │           ├── userBase.routes.ts
│   │   │   │           ├── userBase.service.ts
│   │   │   │           ├── userBase.types.ts
│   │   │   │           └── userBase.validate.ts
│   │   │   └── wallet/                # Wallet management
│   │   │       ├── wallet.model.ts
│   │   │       └── wallet.types.ts
│   │   ├── router/
│   │   │   └── index.ts               # Main router configuration
│   │   └── utils/                     # Utility functions
│   │       ├── calculateAmount.ts
│   │       ├── catchAsync.ts
│   │       ├── checkWalletRestriction.ts
│   │       ├── getUserAndWallet.ts
│   │       ├── getUserModel.ts
│   │       ├── hash.ts
│   │       ├── jwt.ts
│   │       ├── seedAccountAndSupeAdmin.ts
│   │       ├── sendResponse.ts
│   │       ├── setCookies.ts
│   │       ├── transaction/
│   │       │   ├── rolePermissions.ts
│   │       │   ├── updateBalance.ts
│   │       │   ├── validateTransaction.ts
│   │       │   └── validateTransactionRule.ts
│   │       └── userTokens.ts
│   ├── app.ts                         # Express app configuration
│   └── server.ts                      # Server entry point
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── eslint.config.mjs                  # ESLint configuration
├── vercel.json                        # Vercel deployment config
└── README.md                          # This file
```

## 🛠️ Setup and Environment Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd B5A5
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory with the following variables:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/digital-wallet

   # JWT Configuration
   JWT_ACCESS_SECRET=your-access-secret-key
   JWT_ACCESS_EXPIRES=15m
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_REFRESH_EXPIRES=7d

   # Security
   BCRYPT_SALT_ROUND=12

   # Super Admin Configuration
   SUPER_ADMIN_EMAIL=admin@example.com
   SUPER_ADMIN_PASSWORD=admin123
   SUPER_ADMIN_PHONE=+1234567890
   ```

4. **Database Setup**

   ```bash
   # Start MongoDB (if running locally)
   mongod

   # The application will automatically create the super admin account on first run
   ```

5. **Run the application**

   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📚 API Endpoints

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication Endpoints

| Method | Endpoint      | Description                 | Auth Required |
| ------ | ------------- | --------------------------- | ------------- |
| `POST` | `/auth/login` | User login with credentials | No            |

### User Management Endpoints

#### Personal Users

| Method | Endpoint                      | Description                | Auth Required | Roles           |
| ------ | ----------------------------- | -------------------------- | ------------- | --------------- |
| `POST` | `/user/personal/register`     | Register new personal user | No            | -               |
| `GET`  | `/user/personal/transactions` | View transaction history   | Yes           | PERSONAL, AGENT |
| `GET`  | `/user/personal/balance`      | Check wallet balance       | Yes           | PERSONAL, AGENT |

#### Agent Users

| Method | Endpoint                  | Description             | Auth Required | Roles |
| ------ | ------------------------- | ----------------------- | ------------- | ----- |
| `POST` | `/user/agent/register`    | Register new agent user | No            | -     |
| `GET`  | `/user/agent/commissions` | View commission history | Yes           | AGENT |

#### Admin Users

| Method  | Endpoint                       | Description             | Auth Required | Roles |
| ------- | ------------------------------ | ----------------------- | ------------- | ----- |
| `POST`  | `/user/admin/register`         | Register new admin user | Yes           | ADMIN |
| `GET`   | `/user/admin/get-users`        | View all users          | Yes           | ADMIN |
| `GET`   | `/user/admin/get-wallets`      | View all wallets        | Yes           | ADMIN |
| `GET`   | `/user/admin/get-transactions` | View all transactions   | Yes           | ADMIN |
| `PATCH` | `/user/admin/manage-agent`     | Manage agent status     | Yes           | ADMIN |
| `PATCH` | `/user/admin/update-wallet`    | Update wallet status    | Yes           | ADMIN |

### Transaction Endpoints

| Method | Endpoint                | Description                | Auth Required | Roles           |
| ------ | ----------------------- | -------------------------- | ------------- | --------------- |
| `POST` | `/transaction/send`     | Send money to another user | Yes           | AGENT, PERSONAL |
| `POST` | `/transaction/cash-in`  | Cash in money              | Yes           | AGENT           |
| `POST` | `/transaction/cash-out` | Cash out money             | Yes           | PERSONAL        |
| `POST` | `/transaction/top-up`   | Top up wallet              | Yes           | PERSONAL, AGENT |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Short-lived token for API access
- **Refresh Token**: Long-lived token for token renewal
- **Role-based Authorization**: Different endpoints require specific user roles

### Request Headers

```
Authorization: access_token
Content-Type: application/json
```

## 👥 User Roles

### Admin

- Full system access
- User management
- Transaction monitoring
- System configuration

### Agent

- Cash-in operations
- Commission tracking
- Limited user management
- Transaction processing

### Personal

- Basic wallet operations
- Send money
- Cash-out operations
- Transaction history

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Zod schema validation for all inputs
- **Role-based Access Control**: Granular permissions
- **Error Handling**: Comprehensive error management
- **Request Validation**: Middleware-based request validation

## 🚀 Deployment

### Vercel Deployment

The project includes Vercel configuration for easy deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

Ensure all environment variables are properly configured in your deployment platform.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using Node.js, Express, TypeScript, and MongoDB**
