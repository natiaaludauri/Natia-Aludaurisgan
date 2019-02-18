const mongoose = require('mongoose');
const Joi = require('joi');


const Product = mongoose.model("Product", new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },

    supplier: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true,
        maxlength: 500
    }
}, { timestamps: true }))

function validateProduct(product) {
    const schema = {
        name: Joi.string().min(5).max(30).required(),
        supplier: Joi.string().required(),
        photo: Joi.string().max(500).required()

    };

    return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validatep = validateProduct;