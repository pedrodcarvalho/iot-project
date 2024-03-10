const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/jwt');
const userController = require('../controllers/userController');

router.get('/user', verifyJWT, userController.getUser);

module.exports = router;
