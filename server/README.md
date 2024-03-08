# Server [[Thalia](https://github.com/izam-mohammed/thalia)]

Welcome to the Thalia server repository! This folder contains all the code for the backend of our website, including APIs, database configurations, and other server-side logic. Thalia server is built with Express.js and utilizes MongoDB as the database.

## Features

- **RESTful APIs:** Provides a set of RESTful APIs for handling user authentication, data retrieval, and administrative tasks.
- **MongoDB Database:** Integrates MongoDB as the database backend for storing user data, website content, and other relevant information.
- **Express.js:** Utilizes Express.js, a minimal and flexible Node.js web application framework, for building robust and scalable server-side applications.
- **Authentication:** Implements authentication mechanisms such as JWT (JSON Web Tokens) for secure user authentication and authorization.
- **Middleware:** Utilizes middleware functions for handling request processing, error handling, and other common tasks.
- **Security:** Implements security best practices to protect against common web security vulnerabilities such as XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/izam-mohammed/thalia
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
# Create a .env file in the server directory and add the following:
DB_URL=<mongo_db_connect_string>
PORT=<server_port>
NODE_ENV=development
JWT_SECRET=<jwt_secret_key>
NODEMAILER_PASS=<google_app_password>
```

4. Start the development server:

```bash
npm start
```

5. The server will start running at the specified port. You can test the APIs using tools like Postman.

## Directory Structure

The server folder is organized as follows:

```
server/
│
├── config/                   # Configuration files and setup
│
├── controller/               # Request handlers and business logic
│
├── middlewares/              # Middleware functions
│
├── models/                   # Mongoose models and database schemas
│
├── routes/                   # Route definitions
│
├── utils/                    # Utility functions and helpers
│
├── .eslintrc.json            # ESLint configuration
├── package.json              # NPM package configuration
├── app.js                    # main js file
├── package.json              # NPM package configuration
├── vercel.json               # Vercel deployment configuration
└── README.md                 # This README file
```

## Contributing

Contributions to the Thalia server are welcome! Please refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file for guidelines and instructions.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE) file for details.

## Acknowledgements

- Thalia team would like to thank the creators and contributors of Express.js and MongoDB for their amazing work and contributions.
- Special thanks to all contributors and supporters who help make Thalia server a reality.
