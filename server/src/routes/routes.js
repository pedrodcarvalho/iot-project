const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/jwt');
const homeController = require('../controllers/homeController');

router.get('/home', verifyJWT, homeController.getHome);

module.exports = router;
