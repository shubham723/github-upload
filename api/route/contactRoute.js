const express = require ('express');
const router = express.Router();

// get handler
const contactHandler = require ('../handler/contactHandler');

router.get('/get',contactHandler.getContact);
router.post('/add',contactHandler.addContact);

module.exports = router;