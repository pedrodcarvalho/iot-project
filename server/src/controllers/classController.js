const User = require('../models/user');

const getClasses = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });
        res.status(200).json(user.classes);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const addClass = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });

        const _class = req.body.class;

        const newClass = {
            name: _class,
            students: []
        };

        if (user.classes.some((c) => c.name === _class)) {
            return res.status(400).json({ message: 'Class already exists' });
        }

        user.classes.push(newClass);
        await user.save();

        res.status(200).json({ message: 'Class added successfully' });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const makeAttendance = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });

        const _class = req.body.class;
        const students = req.body.students;

        const classIndex = user.classes.findIndex((c) => c.name === _class);
        if (classIndex === -1) {
            return res.status(400).json({ message: 'Class not found' });
        }

        students.forEach((student) => {
            const _id = user.students.find((s) => s.cardId === student);

            user.classes[classIndex].students.push({
                name: student,
                time: new Date().toISOString(),
                _id: _id
            });
        });

        await user.save();
        res.status(200).json(user.classes);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getAttendance = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.data.username });
        res.status(200).json(user.classes);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    getClasses,
    addClass,
    makeAttendance,
    getAttendance
};
