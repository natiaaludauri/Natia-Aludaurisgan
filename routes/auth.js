const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');


const {Product, validatep} = require('../models/product');

 
router.post('/', async (req, res) => {
 
    try{

    const {error} = validate(req.body);

    if(error) {
        // return res.status(400).send(error.details[0].message);
        return res.status(400).json(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(!user) {
        // return res.status(400).send("Wrong email!")
        return res.status(400).json("Wrong email!")
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        // return res.status(400).send("wrong password!");
        return res.status(400).json("wrong password!");
    }

    const token = jwt.sign({ email: user.email }, config.get('PrivateKey'));
    res.header('x-auth-token', token)

    let all = await Product.find({}).exec();

    const decoded = jwt.verify(token, config.get('PrivateKey'));
    res.json({decoded, all});

}catch(err) {
        
    res.status(500).json({message: err.message});
}

   
});


router.get('/', async (req,res)=>{
    let every = await Product.find({}).exec();
    res.json(every);
})

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
}
 
module.exports = router;
