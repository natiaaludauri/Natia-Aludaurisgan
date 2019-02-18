const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'Okey'}); 
});

router.post('/', async (req,res)=>{

    // try {

    //     // console.log(req.body.name);

    //     let user = new User({
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password
    //     })

    //     await user.save();

    //     res.status(200).json(user);

    // }catch(err) {
    //     console.log(err.message);
    //     res.status(500).json({
    //         message: err.message
    //     })
    // }

    try {
        const { error } = validate(req.body);
        if (error) {
            // return res.status(400).send(error.details[0].message); //
            return res.status(400).json({message: error.details[0].message})
        }
    
        //იმეილის უნიკალურობაზე დაყრდნოობით ვამოწმებთ, უკვე არსებოობს თუ არა მოცემული იუზერი
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // return res.status(400).send('That user already exisits!');
            return res.status(400).json({message: 'user exists'});
        } else {
            // თუ არ არსებობს ახლის შექმნა 
            user = new User({
                name: req.body.name,
                email: req.body.email,  
                password: req.body.password 
            });
    
            // let user = await User.create(req.body.userDetails)
    
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        
    
            await user.save();
            // res.send(`user ${user.name} is registered!`);
            // res.send(user);
            res.status(200).json({user});
            
        }
    }catch(err) {
        
        res.status(500).json({message: err.message});
    }

})

module.exports = router;