const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/jwt');
const userController = require('../controllers/userController');
const studentController = require('../controllers/studentController');
const classController = require('../controllers/classController');

router.get('/user', verifyJWT, userController.getUser);
router.get('/students', verifyJWT, studentController.getStudents);
router.post('/add-student', verifyJWT, studentController.addStudent);
router.post('/edit-student/:action', verifyJWT, studentController.editStudent);
router.get('/find-student/:cardId', verifyJWT, studentController.findStudent);
router.post('/get-student-presence', verifyJWT, studentController.getStudentPresence);
router.get('/get-classes', verifyJWT, classController.getClasses);
router.post('/add-class', verifyJWT, classController.addClass);
router.post('/make-attendance', verifyJWT, classController.makeAttendance);
router.get('/get-attendance', verifyJWT, classController.getAttendance);

module.exports = router;
