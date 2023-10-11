const { addMessage, getAllMessages, makeSeen } = require('../controllers/messageController.js');
const router = require('express').Router();

router.post('/chat/addMessage', addMessage);
router.get('/chat/getAllMessages', getAllMessages);
router.post('/chat/markChatAsSeen', makeSeen);




module.exports = router;


