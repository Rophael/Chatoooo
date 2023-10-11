const messageSchema = require('../models/messageModel');
const mongoose = require('mongoose');
const Message = mongoose.model('messages', messageSchema);
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Types.ObjectId;
const crypto = require('crypto');

// Encrypt message
const encryptMessage = (message) => {
    try {
        const cipher = crypto.createCipheriv('aes-256-ctr', process.env.ENCRYPTION_KEY, process.env.INITIALIZATION_VECTOR);
        const encryptMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
        return encryptMessage;
    } catch (err) {
        console.log(err)
    }
};
// Decrypt message
const decryptMessage = (message) => {
    try {
        const decipher = crypto.createDecipheriv('aes-256-ctr', process.env.ENCRYPTION_KEY, process.env.INITIALIZATION_VECTOR);
        const decryptMessage = decipher.update(message, 'hex', 'utf8') + decipher.final('utf8');
        return decryptMessage;
    } catch (err) {
        console.log(err)
    }
};

// Add a new message
const addMessage = async (req, res) => {
    try {
        // check if all fields are entered
        if (!req.body.from || !req.body.to || !req.body.message) {
            return res.status(200).json({ message: "Please enter all fields", status: false })
        }
        // check if authorization header is present
        if (!req.headers.authorization) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        token = req.headers.authorization.split(' ')[1]
        // check if token is present
        if (!token) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        // verify token
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.status(200).json({ message: "Please login first", status: false })
        }

        const { from, to, message } = req.body;
        if (!(ObjectId.isValid(from) && ObjectId.isValid(to))) {
            return res.status(200).json({ status: false, message: 'Invalid user id' });
        }
        if (from === to) {
            return res.status(200).json({ status: false, message: 'You cannot send message to yourself' });
        }
        if (message.length > 1000) {
            return res.status(200).json({ status: false, message: 'Message cannot be more than 1000 characters' });
        }
        if (message.length < 1) {
            return res.status(200).json({ status: false, message: 'Message cannot be empty' });
        }
        await message.trim();
        const hashMessage = encryptMessage(message);
        const data = await Message.create({
            message: {
                text: hashMessage
            },
            sender: from,
            users: [from, to]

        });
        if (data) {
            res.status(200).json({ status: true, message: 'Message sent successfully', data });
        }
        if (!data) {
            res.status(200).json({ status: false, message: 'Message not sent' });
        }
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};
// get all messages
const getAllMessages = async (req, res) => {
    try {

        if (!req.headers.from || !req.headers.to) {
            return res.status(200).json({ message: "Please enter all fields", status: false })
        }

        if (!req.headers.authorization) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        const { from, to } = req.headers;
        const data = await Message.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
        if (!data) {
            return res.status(200).json({ status: false, message: 'No messages found' });
        }

        const projectMessages = data.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: decryptMessage(message.message.text),
                seen: message.message.seen,
                id: message._id,
                sentAt: message.createdAt
            };
        });

        res.status(200).json({ status: true, messages: projectMessages });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    };
}
// delete message
const deleteMessage = async (req, res) => {
    try {
        if (!req.body.messageId) {
            return res.status(200).json({ message: "Please enter all fields", status: false })
        }
        if (!req.headers.authorization) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        const { messageId } = req.body;
        const data = await Message.findByIdAndDelete(messageId);
        if (!data) {
            return res.status(200).json({ status: false, message: 'No messages found' });
        }
        res.status(200).json({ status: true, message: 'Message deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    };
}
// update message
const updateMessage = async (req, res) => {
    try {
        if (!req.body.messageId || !req.body.seen) {
            return res.status(200).json({ message: "Please enter all fields", status: false })
        }
        if (!req.headers.authorization) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.status(200).json({ message: "Please login first", status: false })
        }
        const { messageId, seen } = req.body;
        const data = await Message.findByIdAndUpdate(messageId, { seen: seen });
        if (!data) {
            return res.status(200).json({ status: false, message: 'No messages found' });
        }
        res.status(200).json({ status: true, message: 'Message updated successfully' });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    };
}
// make seen 
const makeSeen = async (req, res) => {
    try {
        if (!req.body.chatId) {
            return res.status(200).json({ message: "Please enter all fields", status: false })
        }
        const { chatId } = req.body;
        const data = await Message.updateMany({ users: { $all: [chatId] } }, { $set: { "message.seen": true } });
        // const data = await Message.findByIdAndUpdate({ sender: chatId }, { message: { seen: true } });

        if (!data) {
            return res.status(200).json({ status: false, message: 'No messages found' });
        }
        res.status(200).json({ status: true, message: 'Message updated successfully' });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    };
}




module.exports = { addMessage, getAllMessages, makeSeen }
