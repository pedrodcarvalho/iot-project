const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/jwt');
const userController = require('../controllers/userController');
const studentController = require('../controllers/studentController');

router.get('/user', verifyJWT, userController.getUser);
router.post('/add-student', verifyJWT, studentController.addStudent);
router.post('/edit-student/:action', verifyJWT, studentController.editStudent);

module.exports = router;
