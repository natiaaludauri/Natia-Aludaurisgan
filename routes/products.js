
const {Product, validatep} = require('../models/product');

const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{


    try {
        const { error } = validatep(req.body);
        if (error) {
            // return res.status(400).send(error.details[0].message); //
            return res.status(400).json({message: error.details[0].message})
        }
    
        //იმეილის უნიკალურობაზე დაყრდნოობით ვამოწმებთ, უკვე არსებოობს თუ არა მოცემული იუზერი
        let product = await Product.findOne({ name: req.body.name });
        if (product) {
            // return res.status(400).send('That user already exisits!');
            return res.status(400).json({message: 'product exists'});
        } else {
            // თუ არ არსებობს ახლის შექმნა 
            product = new Product({
                name: req.body.name,
                supplier: req.body.supplier,
                photo: req.body.photo
            });
    
    
            await product.save();
            // res.send(`user ${user.name} is registered!`);
            // res.send(user);
            res.status(200).json({product});
            
        }
    }catch(err) {
        
        res.status(500).json({message: err.message});
    }

})

module.exports = router;