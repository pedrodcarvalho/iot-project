const User = require('../models/user');

const addStudent = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });

        const { name, studentNumber, course } = req.body;
        const newStudent = {
            name,
            studentNumber,
            course,
            cardId
        };

        user.students.push(newStudent);
        await user.save();

        res.status(200).json({ message: 'Student added successfully' });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const editStudent = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });
        const student = user.students.filter(student => student.studentNumber === req.body.studentNumber)[0];

        if (!student) {
            throw new Error('Student not found');
        }

        const { name, studentNumber, course, cardId } = req.body;
        const action = req.params.action;

        switch (action) {
            case 'update':
                student.name = name;
                student.studentNumber = studentNumber;
                student.course = course;
                student.cardId = cardId;
                break;
            case 'delete':
                student.remove();
                break;
            default:
                throw new Error('Invalid action');
        }

        await user.save();

        res.status(200).json({ message: 'Student edited successfully' });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    addStudent,
    editStudent
};
