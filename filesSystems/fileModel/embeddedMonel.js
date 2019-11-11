import mongoose from 'mongoose';

const embedded = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required:true },
    author: [{type:String, required:true}],
    published_date: {type:Date, required:true},
    pages: {type: Number, required:true, ref:'embeddedjson'},
    language: {type: String, required:true},
    publisher: {
        name:{type: String, required:true},
        founded:{type: Number, required:true},
        location:{type: String, required:true}
    },
});

module.exports = mongoose.model('embeddedjson', embedded);