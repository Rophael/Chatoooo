const userSchema = require('../models/userModel');
const mongoose = require('mongoose');
const User = mongoose.model('users', userSchema);
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();
// token
const createToken = (data) => {
    return jwt.sign({ data }, process.env.SECRET, {
        expiresIn: '3d'
    })
};
// login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ status: false, message: "Please enter all fields" })
        }
        if (!validator.isEmail(email)) {
            return res.status(200).json({ status: false, message: "Email is not valid" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({ status: false, message: "Email does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(200).json({ status: false, message: "Wrong Password" })
        }
        delete user.password
        data = {
            username: user.username,
            email: user.email,
            id: user._id,
        }

        //create token
        const token = createToken(data);
        res.status(200).json({ status: true, token })


    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}
// register user
const register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(200).json({ message: "Please enter all fields", status: false })
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(200).json({ message: "Email is not valid", status: false })
        }
        if (!validator.isStrongPassword(req.body.password)) {
            return res.status(200).json({ message: "Password is not strong enough", status: false })
        }
        const userNameCheck = await User.findOne({ username: req.body.username })
        if (userNameCheck) {
            return res.status(200).json({ message: "Username already exists", status: false })
        }
        const emailCheck = await User.findOne({ email: req.body.email })
        if (emailCheck) {
            return res.status(200).json({ message: "Email already exists", status: false })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({ ...req.body, password: hashedPassword })
        const data = {
            username: newUser.username,
            email: newUser.email,
            id: newUser._id,
        }
        const token = createToken(data);
        res.status(201).json({ status: true, token })
    }
    catch (err) {
        res.status(200).json({ message: err.message, status: false })
    }
}
//Set user image
const setImg = async (req, res) => {
    try {
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
        const user = await User.findById(decoded.data.id)
        if (!user) {
            return res.status(200).json({ message: "User not found", status: false })
        }
        const { image } = req.files;
        if (!image) {
            return res.status(200).json({ message: "Please upload an image", status: false })
        }
        // If does not have image mime type prevent from uploading
        if (!/^image/.test(image.mimetype)) {
            return res.status(200).json({ message: "Please upload an image type", status: false })
        }
        const parentDir = path.join(__dirname, '..', "images");
        await image.mv(parentDir + `/${user._id}.jpg`);
        user.img = `${user._id}.jpg`;
        await user.save();
        res.status(200).json({ message: "Image uploaded successfully", status: true })

    } catch (err) {
        res.status(200).json({ message: err.message, status: false })
    }
}
// logout user
const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: "Logged out" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
//getAllUSers
const getAllUsers = async (req, res) => {
    try {
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

        const users = await User.find({ _id: { $ne: decoded.data.id } }).select([
            "username",
            "img",
            "_id"
        ])
        for (let i = 0; i < users.length; i++) {
            const imageName = users[i].img;
            if (typeof imageName === 'string') {
                const imagePath = path.join(__dirname, '..', 'images', imageName);
                const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
                users[i].img = imageBase64;
            }
        }

        res.status(200).json({ message: "Users fetched successfully", status: true, data: users })
    }
    catch (err) { res.status(200).json({ message: err.message, status: false }) }
}
// getCurrentUser
const getCurrentUser = async (req, res) => {
    try {
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
        const user = await User.findById(decoded.data.id).select([
            "username",
            "img",
            "_id"
        ])

        const imageName = user.img;
        if (typeof imageName === 'string') {
            const imagePath = path.join(__dirname, '..', 'images', imageName);
            const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
            user.img = imageBase64;
        }
        res.status(200).json({ message: "Users fetched successfully", status: true, data: user })

    }
    catch (err) { res.status(200).json({ message: err.message, status: false }) }
}
module.exports = { register, login, logout, setImg, getAllUsers, getCurrentUser };