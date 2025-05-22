 Money Transfer Simulation

This project is a UPI-style money transfer simulation built with NestJS and MongoDB (Atlas + Compass). It allows users to register with a custom initial wallet balance and perform peer-to-peer fund transfers via phone numbers.

🔧 Features Implemented in MAIN Branch
* Modular NestJS Architecture
    * Organized into UserModule, WalletModule, and TransferModule for clear separation of concerns
* User Registration & Wallet Provisioning
    * POST /users — register users by providing name, phone, and initialBalance
    * Automatically provisions a wallet linked to the new user
* Wallet Management APIs
    * POST /wallet — manual wallet creation if needed
    * GET /wallet/:phone — query wallet balance by phone number
* Atomic Fund Transfers
    * POST /transfer — execute peer-to-peer transfers
    * Validates distinct sender/receiver, sufficient balance; logs each transaction
* Transactional ACID Guarantees
    * Leverages MongoDB sessions to ensure atomicity, consistency, and isolation of transfer operations
* MongoDB Atlas & Compass Integration (Mongoose)
    * MongooseModule.forRootAsync with @nestjs/config for dynamic connection
    * Schemas for User, Wallet, and Transaction with server-side validation
    * MongoDB Compass for GUI-based inspection and real-time data analysis
* Input Validation & API Documentation
    * DTOs using class-validator and @nestjs/swagger decorators
    * Interactive Swagger UI available at /api
* Environment-Based Configuration
    * ConfigModule loads MONGO_URI from .env

🏗️ Tech Stack & Tools
* Framework: NestJS (TypeScript)
* Database: MongoDB Atlas + Compass via Mongoose ODM
* API Docs: Swagger (@nestjs/swagger)
* Validation: class-validator, global ValidationPipe
* Config: @nestjs/config + .env

🚀 Installation & Setup
1. Clone the repo git clone <repo-url>
2. cd upi-simulator
3. Install dependencies npm install
4. Configure environment
    * Create a .env file with: MONGO_URI=mongodb+srv://admin:<db_password>@mydb.qjllmxu.mongodb.net/
5. Start the app npm run start:dev
6. Browse API docs Open swagger : http://localhost:3001/api#/
  

📜 API Endpoints
Method	Path	Description
1.POST	/users	Register user & auto-provision wallet
2.GET	/users	List all users
3.POST	/wallet	Manually create a wallet
4.GET	/wallet/:phone	Get wallet by phone number
5.POST	/transfer	Transfer funds between wallets

🎓 Usage Example
1. Register Alice POST /users
 { "name": "Alice", "phone": "1111111111", "initialBalance": 500 }
2. Register Bob POST /users
   { "name": "Bob", "phone": "2222222222", "initialBalance": 300 }
3. Transfer ₹100 POST /transfer
  { "senderPhone": "1111111111", "receiverPhone": "2222222222", "amount": 100 }
4. Verify Balances
GET /wallet/1111111111  # expects balance: 400
GET /wallet/2222222222  # expects balance: 400
