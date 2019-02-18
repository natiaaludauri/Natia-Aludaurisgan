const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const path = require('path');
const config = require('config');

const bodyParser= require('body-parser');
const mongoose = require("mongoose");
const users = require('./routes/users');
const auth = require('./routes/auth');
const products = require('./routes/products');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


mongoose.connect('mongodb://natia:daqusi@restful-api-shard-00-00-mneny.mongodb.net:27017,restful-api-shard-00-01-mneny.mongodb.net:27017,restful-api-shard-00-02-mneny.mongodb.net:27017/test?ssl=true&replicaSet=RESTFUL-API-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use('/users', users);
app.use('/auth', auth);
app.use('/products', products);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));