const mongoose =  require('mongoose');

const CourseSchema =  new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true , 'Please enter a title of the Course']
    },
    description : {
        type : String,
        required : [true , 'Please enter a description of the Course']
    },
    weeks : {
        type : Number,
        required : [true , 'Please enter duration of the Course']
    },
    tuition : {
        type : Number , 
        required : [true , 'Please enter tution fees of the Course']
    },
    minimumSkill : {
        type : String,
        required : [true , 'Please add minimum skill for the Course'],
        enum : ['beginner','intermediate','advanced']
    },
    scholarhipsAvailable : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    bootcamp : {
        type : mongoose.Schema.ObjectId,
        ref : 'Bootcamp',
        required : true
    } 
})

module.exports = mongoose.model('Course',CourseSchema);