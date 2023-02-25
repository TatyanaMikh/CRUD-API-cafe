const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const worker_schema = new Schema({


    workers_name : {
        type:String,
        required:true,
        unique:true
    },

    workers_role: {
        type:String,
        //required:true,
        //default:"Waitress"
    }
});


module.exports = mongoose.model('workers', worker_schema);