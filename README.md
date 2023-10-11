# Hi, I'm Rophael! 👋

## 🚀 About Me

I'm a Software Engineer (full stack developer) ...

# Chatoooo

![Logo](https://lh3.googleusercontent.com/drive-viewer/AK7aPaAzFek4sB-OuMu7HtzGYRkdEvj5jXqMCbYIsn8l4VQVHVcohI5wt3o4vAbBX4Jep4MIaJwcHimO3Mp0o_HRr4nqqMxT-g=s1600)
Welcome to the ChatApp repository, a powerful and versatile real-time chat application built using Node.js, Express.js, MongoDB, React.js, and Socket.io. This project provides a robust foundation for creating interactive and engaging chat applications that support instant messaging with WebSocket technology.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v14-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4-blue.svg)](https://www.mongodb.com/)
[![React.js](https://img.shields.io/badge/React.js-v17-blue.svg)](https://reactjs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-v4-blue.svg)](https://socket.io/)

# Chatoooo Documentation

Welcome to the documentation for Chatoooo. This documentation is designed to help you understand, use, and contribute to the project.

## Table of Contents

1. [Acknowledgements](#acknowledgements)
2. [API Reference](#api-reference)

- [Auth Endpoints](#Auth-endpoints)
- [User Endpoints](#user-endpoints)
- [Chat Endpoints](#chat-endpoints)

3. [Deployment](#deployment)
4. [Environment Variables](#environment-variables)
5. [Authors](#authors)

## Acknowledgements

We want to acknowledge and express our appreciation to the following technologies, libraries, and communities that have been instrumental in the development of ChatApp:

- [Node.js](https://nodejs.org/) for providing the runtime environment and server-side capabilities.
- [Express.js](https://expressjs.com/) for simplifying the creation of robust APIs and routes.
- [MongoDB](https://www.mongodb.com/) for scalable and efficient data storage.
- [React.js](https://reactjs.org/) for the dynamic and interactive user interface.
- [Socket.io](https://socket.io/) for enabling real-time communication and WebSocket support.

These technologies have played a crucial role in making ChatApp a reality. We also extend our thanks to the open-source communities that have developed and maintained these tools, as well as the countless online tutorials and resources that have helped us harness their power.

## API Reference

### Auth Endpoints

#### Register a new user

```http
POST api/auth/register
```

Registers a new user.

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. User's username     |
| `password` | `string` | **Required**. User's password     |
| `email`    | `string` | **Required** User's email address |

#### User Login

```http
POST api/auth/login
```

Logs in an existing user.

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

#### User Logout

```http
GET api/auth/logout
```

Logs out the currently authenticated user.

#### Set User Image

```http
POST api/auth/setImg
```

Sets the user's profile image.

| Parameter | Type    | Description              |
| :-------- | :------ | :----------------------- |
| `img`     | `image` | **Required**. Image File |
| `id`      | `token` | **Required**. User Token |

### User Endpoints

#### Get all users

```http
GET api/user/allUsers
```

| Parameter | Type    | Description              |
| :-------- | :------ | :----------------------- |
| `id`      | `token` | **Required**. User Token |

Retrieves a list of all users.Except for the user himself

#### Get current user

```http
GET api/user/currentUser
```

| Parameter | Type    | Description              |
| :-------- | :------ | :----------------------- |
| `id`      | `token` | **Required**. User Token |

Retrieves information about the currently authenticated user.

### Chat Endpoints

#### Add a new message

```http
POST api/chat/addMessage
```

Adds a new message to the chat.

| Parameter  | Type       | Description                       |
| :--------- | :--------- | :-------------------------------- |
| `message`  | `string`   | **Required**. The message content |
| `sender`   | `ObjectId` | **Required**. The sender's Id     |
| `receiver` | `ObjectId` | **Required**. The receiver's Id   |

#### Get all chat messages

```http
GET api/chat/getAllMessages
```

| Parameter  | Type       | Description                     |
| :--------- | :--------- | :------------------------------ |
| `sender`   | `ObjectId` | **Required**. The sender's Id   |
| `receiver` | `ObjectId` | **Required**. The receiver's Id |

Retrieves all chat messages between them.

#### Mark a chat as seen

```http
POST api/chat/markChatAsSeen
```

Marks a chat as "seen."

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `chatId`  | `string` | **Required**. The ID of the chat to mark as seen |

## Deployment

To deploy this project, follow these steps:

1. Clone the repository to your server:

```bash
git clone https://github.com/your-username/ChatApp.git
```

2. Navigate to the server directory and install the Node.js dependencies:

```bash
cd server
npm install
```

3. Configure the environment variables by creating a `.env` file with the necessary settings. You may use a tool like [dotenv](https://www.npmjs.com/package/dotenv) to manage environment variables.

4. Start the Node.js server:

```bash
npm start
```

5. Now, navigate to the client directory:

```bash
cd ../public
```

6. Install the React.js dependencies:

```bash
npm install
```

7. Start the React.js development server:

```bash
npm start
```

This will launch the development server, and your ChatApp should be accessible in your web browser.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `MONGO_URI` - The MongoDB connection string.
- `PORT` - The port on which the server will run.
- `SECRET` - A secret key for authentication.
- `ENCRYPTION_KEY` - Key for encryption.
- `INITIALIZATION_VECTOR` - Initialization vector for encryption.

## Authors

- [@Rophael](https://github.com/Rophael)
