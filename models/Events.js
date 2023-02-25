const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const event_schema = new Schema({


    events_name : {
        type:String,
        required:true,
        unique:true
    },
    events_expiry : {
        type:Date,
        required:true
    },

    events_description: {
        type:String,
        required:true,
    },

    events_status : {
        type: String,
        default: false,
        //required:true
    }

});


module.exports = mongoose.model('events', event_schema);