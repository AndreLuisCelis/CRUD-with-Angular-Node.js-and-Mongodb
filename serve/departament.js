let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let departamentsSchema = new Schema({
    name:String,
}, {versionKey: false});

module.exports = mongoose.model("Departament", departamentsSchema);