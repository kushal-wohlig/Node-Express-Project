let mongoose = require('mongoose');

//set the schema for article
let articleSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true

    },
    body:{
        type:String,
        required:true
    }
}); 

let Article=module.exports = mongoose.model('Article',articleSchema);