const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {type:String, required:true, min:6, max:266 },
    email: {type:String, required:true, min:6, max:400},
    password: {type:String, required:true, min:6, max:1024},
    date: {type:Date, default:Date.now},
    role: {type:String, default:''},
});

module.exports = mongoose.model('User',userSchema);