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

module.exports = {
    addStudent
};
