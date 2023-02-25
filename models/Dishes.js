const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dish_schema = new Schema({


    dish_name : {
        type:String,
        required:true,
        unique:true
    },
    dish_allergy_inform : {
        type:String,
        //required:true
    },

    dish_description: {
        type:String,
        required:true,
    },

    dish_category : {
        type: String,
        //required:true
    }

});



module.exports = mongoose.model('dishes', dish_schema);