let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name:String,
    price:Number,
    stock: Number,
    departaments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Departament'}]
}, {versionKey: false});

module.exports = mongoose.model("Product", productSchema);