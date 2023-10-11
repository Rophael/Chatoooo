const { register, login, logout, setImg, getAllUsers, getCurrentUser } = require('../controllers/userController.js');
const router = require('express').Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/logout', logout);
router.post('/auth/setImg', setImg);
router.get('/user/allUsers', getAllUsers)
router.get('/user/currentUser', getCurrentUser)


module.exports = router;

