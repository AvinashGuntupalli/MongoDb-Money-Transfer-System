Money Transfer Simulation
 A NestJS microservice that allows peer-to-peer money transfers using MongoDB Atlas, with full user registration, wallet management, transactional transfers, and Swagger-powered API docs.

Features Implemented in MAIN Branch
* Global NestJS CLI setup & modular architecture Clean, feature-driven modules (UserModule, WalletModule, TransferModule)
* User Registration & Wallet Provisioning
    * POST /users — accepts name, phone, and initialBalance
    * Automatically creates a Wallet linked to the new user
* Wallet Management APIs
    * POST /wallet — manual wallet creation (if needed)
    * GET /wallet/:phone — fetch wallet balance by phone number
* Atomic Fund Transfers
    * POST /transfer — transfers funds from one phone to another
    * Validates distinct accounts, sufficient balance, and logs each transaction
* Transactional ACID Guarantees
    * Uses MongoDB sessions to ensure atomicity, consistency, and isolation on each transfer
* MongoDB Atlas Integration (Mongoose)
    * MongooseModule.forRootAsync using @nestjs/config
    * Schemas for User, Wallet, and Transaction with robust validation
* Input Validation & Swagger Documentation
    * DTOs with class-validator and @nestjs/swagger decorators
    * Interactive API docs at /api
* Environment-Based Configuration
    * ConfigModule loads MONGO_URI from .env

Tech Stack & Tools
* Framework: NestJS (TypeScript)
* Database: MongoDB Atlas via Mongoose (transactions, ACID)
* API Docs: Swagger (@nestjs/swagger)
* Validation: class-validator, DTOs, global ValidationPipe
* Config: @nestjs/config + .env
* Testing & Dev: Nodemon/Nest CLI, Postman or curl


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
