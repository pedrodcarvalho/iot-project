const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    classes: [
        {
            name: String,
            students: [
                {
                    name: String,
                    time: Date
                }
            ]
        }
    ],
    students: [
        {
            name: String,
            studentNumber: String,
            course: String,
            cardId: String
        }
    ]
});

// Add passport-local-mongoose plugin to handle password hashing and salting
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
