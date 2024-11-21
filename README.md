# DOGWATCH

## Where pet lovers meet their helpers

DogWatch is where pet owners and pet sitters found each others. Our desire is to connect them all in one place.

## Functionalities:

1. Register and login

- Create a new account and log in to the system.
- Manage personal information via settings.

2. Search

- Search for sitters based on location, service and rating

3. View profile and reviews

- View sitter's profile with reviews.
- When log in, sitter can view dog owner's profiles and reviews.

4. Book for services

- Dog owner can send or cancel booking requests to dog sitters.
- Dog sitter can accept or denied a booking request

5. Review

- Dog owner and dog sitter can review each other if they have a completed booking.

6. Chat

- Dog owner can contact the dog sitter before sending the booking request.
- After a booking request has been sent, dog owner and dog sitter can contact each other.

## Stack

- Back-end: NodeJS and Express
- Database: MySQL

## Dependencies

    "argon2": "^0.41.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "express-session": "^1.18.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.11.4",
    "sequelize": "^6.37.5",
    "socket.io": "^4.8.1"

## Installation

Clone the repo:

```
git clone
```

To run the back-end:

```
cd server
npm install
```

Create and .env file with the following content:

```
PORT=<your-port-number>
DB_HOST=<your-localhost>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-user_password>
DB_NAME=<your-db-name>
SECRET=<your-secret-key>
DB_DIALECT=<your-database-dialect>
```

```
npm run watch
```

## License

Apache License 2.0
