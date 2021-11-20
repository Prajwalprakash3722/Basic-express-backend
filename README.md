# This repository is a Basic Template for the RestFul API for any Full Stack Project.

### Functionalities:

- Can Register and Login Users using a JWT Auth. (no refresh Token alloted)
- Can Create, Read Users. (Updating and Deleting will be Done Soon)
- Has a Separate API route for the Authentication. (Login and Register)
- Basic User Schema is provided, but can be extended to include more fields.
- Middleware function to check if the user has a valid JWT Token is also provided.

### Steps to use this Template:

- Clone without .git

```bash
npm degit https://github.com/Prajwalprakash3722/Basic-express-backend.git
```

- Install Dependencies

```bash
npm install
```

- Run the Server

```bash
npm start
```

- Check the API Status

```bash
curl localhost:3000/api
```

### Connect to the Database:

Connect to the Database using the following changes in `server.js` file:

- Add a new .env file in the root directory of the project and add the following lines:

```env
MONGO_URI=mongodb:mongodb uri goes here
```

Project Structure:

```bash
├── middleware
│   └── Auth.js
├── models
│   └── UserSchema.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── api.js
│   ├── auth.js
│   └── index.js
└── server.js
```

## License: MIT

## Tech Stack

- Node
- Express
- MongoDB
- JWT
- Bcrypt
- Mongoose
