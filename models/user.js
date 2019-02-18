const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model("User", new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    }, 

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    }
}))


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(30).required().email(),
        password: Joi.string().min(5).max(200).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;