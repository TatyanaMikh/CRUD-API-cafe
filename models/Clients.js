const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const client_schema = new Schema({

    client_name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    client_email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    client_password : {
        type:String,
        required:true,
        trim:true
    },
    client_permission: {
        type:Number,
        default:1
    }
});


module.exports = mongoose.model('clients',client_schema);