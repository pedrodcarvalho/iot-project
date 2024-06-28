const User = require('../models/user');

const getStudents = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });
        res.status(200).json(user.students);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const addStudent = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });

        const { name, studentName, course, cardId } = req.body;
        const newStudent = {
            name,
            studentName,
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
        const student = user.students.filter(student => student.cardId === req.body.cardId)[0];

        if (!student) {
            throw new Error('Student not found');
        }

        const { name, studentName, course } = req.body;
        const action = req.params.action;

        switch (action) {
            case 'update':
                student.name = name;
                student.studentName = studentName;
                student.course = course;
                break;
            case 'delete':
                user.students.splice(user.students.indexOf(student), 1);
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

const findStudent = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });
        const student = user.students.filter(student => student.cardId === req.params.cardId)[0];

        if (!student) {
            throw new Error('Student not found');
        }

        res.status(200).json(student);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getStudentPresence = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });
        const student = user.students.filter(student => student.name === req.body.student)[0];

        if (!student) {
            throw new Error('Student not found');
        }

        const classes = req.user.data.classes;

        const studentPresence = classes.map(cl => {
            const attendance = cl.students.filter(st => st.name === student.name)[0];

            return {
                class: cl.name,
                presence: attendance ? attendance : 'Not found'
            };
        });

        res.status(200).json(studentPresence);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    getStudents,
    addStudent,
    editStudent,
    findStudent,
    getStudentPresence
};
