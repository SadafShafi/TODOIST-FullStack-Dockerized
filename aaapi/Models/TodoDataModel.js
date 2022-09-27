

const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    id:{
        type:String,    
        required:true
    },
    todo:{
        type:String,
        requird:true
    },
    done:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('TodoDataModel',TodoSchema);