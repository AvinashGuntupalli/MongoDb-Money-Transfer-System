# NestJS Money Transfer API

A full-featured NestJS API that simulates UPI-style money transfers between users. It uses MongoDB (via Mongoose) to persist user and wallet data. The API is modular, includes Swagger documentation, environment-based config, and uses MongoDB Compass for DB inspection.

##  Features Implemented (Main Branch)

- ✅ Global NestJS CLI setup and modular structure
- ✅ User module with user creation, retrieval by phone
- ✅ Wallet module with automatic wallet creation per user
- ✅ Money transfer logic (debit/credit) with validations
- ✅ Transaction history logging for every transfer
- ✅ MongoDB integration via Mongoose
- ✅ Swagger documentation (`/api`)
- ✅ Input validation using `class-validator`
- ✅ Environment-based config management via `.env`
- ✅ MongoDB Compass used for DB inspection

##  Modules

- **User Module**
  - Create new users with initial balance
  - Auto-generates a wallet linked to the user
- **Wallet Module**
  - Stores `userId`, `phone`, and `balance`
  - Validates uniqueness of phone numbers
- **Transfer Module**
  - Transfers money between wallets
  - Ensures atomicity of sender debit and receiver credit
- **Transaction Module**
  -Stores transaction records with sender, receiver, amount, and timestamp
  -Enables audit and history tracking of transfers

##  Technologies Used

- **NestJS**
- **MongoDB & Mongoose**
- **MongoDB Compass**
- **Swagger (OpenAPI)**
- **class-validator / class-transformer**
- **Dotenv (.env) for config**

## 🔐 Environment Configuration

Create a `.env` file at the root of your project:

env
MONGO_URI=mongodb+srv://admin:admin_2025@mydb.qjllmxu.mongodb.net/avinash



## Installation & Setup
1. Clone the repo git clone <repo-url>
2. cd upi-simulator
3. Install dependencies npm install
4. Configure environment
    * Create a .env file with: MONGO_URI=mongodb+srv://admin:<db_password>@mydb.qjllmxu.mongodb.net/
5. Start the app npm run start:dev
6. Browse API docs Open swagger : http://localhost:3001/api#/
7. Connecting with MongoDB Compass - mongodb+srv://admin:admin_123@mydb.qjllmxu.mongodb.net/
  

## API Endpoints
**Method	Path	Description**
1. POST	/users	Register user & auto-provision wallet
2. GET	/users	List all users
3. POST	/wallet	Manually create a wallet
4. GET	/wallet/:phone	Get wallet by phone number.
5. POST | /transfer | Transfer funds between wallets and store transaction history
6. GET /transaction  Get transaction history

## Usage Example
1. Register Alice POST /users
   { "name": "Alice", "phone": "1111111111", "initialBalance": 500 }
2. Register Bob POST /users
   { "name": "Bob", "phone": "2222222222", "initialBalance": 300 }
3. Transfer ₹100 POST /transfer
   { "senderPhone": "1111111111", "receiverPhone": "2222222222", "amount": 100 }
4. Verify Balances
   GET /wallet/1111111111  # expects balance: 400
   GET /wallet/2222222222  # expects balance: 400
