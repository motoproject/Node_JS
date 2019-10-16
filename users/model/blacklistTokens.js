let mongoose = require('mongoose');

const blackListedTokens = mongoose.Schema({
    tokens:{type:String, require:true, min: 6},
    userID:{type:Number, require:true,}
});

module.exports = mongoose.model('blacktokens', blackListedTokens);