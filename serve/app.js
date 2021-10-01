const express = require( 'express');
const bodyparser = require ( 'body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const products_controller = require('./product_controller');
const departament_controller = require('./departament_controller');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/http_app',
{useNewUrlParser: true , useUnifiedTopology: true });

app.use('/departaments', departament_controller);
app.use('/products', products_controller);

app.listen(3000);
