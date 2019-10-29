const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    invoiceId: {type:Number, required:true, min:1},
    createdDate: {type:Date, required:true},
    dueDate: {type:Date, required:true},
    address:{type:String, required:true},
    companyName:{type:String, required:true},
    invoiceName:{type:String, required:true},
    price:{type:Number, required:true},
});

module.exports = mongoose.model('sampleJson',fileSchema);