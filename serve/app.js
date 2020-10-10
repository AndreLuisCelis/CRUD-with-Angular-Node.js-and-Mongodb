const express = require( 'express');
const bodyparser = require ( 'body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const products_controller = require('./product_controller');
const departament_controller = require('./departament_controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_app',
{useNewUrlParser: true , useUnifiedTopology: true });

app.use('/departaments', departament_controller);
app.use('/products', products_controller);

app.listen(3000);