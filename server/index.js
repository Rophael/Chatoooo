const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const messageRouter = require('./routes/messageRoute');
const socket = require('socket.io');
const fileUpload = require('express-fileupload');
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use(fileUpload());

app.use('/api', userRouter);
app.use('/api', messageRouter);

// to parse data from frontend
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// Socket.io 
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    }
});
global.onlineUsers = new Map(); // to store online users
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("receive-message", data.message);
        }
    });
    socket.on("disconnect", () => {
        onlineUsers.delete(socket.id);
    });


});