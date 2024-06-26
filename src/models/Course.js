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

//creating a static for finding the average cost of the bootcamp
CourseSchema.statics.getAverageCost  = async function(bootcampId){
    console.log('Inside calcuating the average cost');
    const obj = await this.aggregate([
        {
            $match : { bootcamp : bootcampId}
        },{
            $group : {
                _id : '$bootcamp',
                averageCost : { $avg : '$tuition'}
            }
        }
    ])

    console.log('obj>>', obj);
    //  { _id: new ObjectId('667ba374fba7f16fafb04c10'), averageCost: 8000 }
    //updating the average cost with the bootcamp
    try {
        console.log('bootcamp started to update!!!');
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId , {
            averageCost : Math.ceil(obj[0].averageCost)
        });
        console.log('bootcamp updated!!!');
    } catch (error) {
        console.log('error in updating bootcamp',error);
    }
}

//calculate the average cost of the bootcamp post saving the course
CourseSchema.post('save', function (){
    console.log('this in post save',this.constructor.getAverageCost);
    this.constructor.getAverageCost(this.bootcamp);
});


//calculate the average cost of the Bootcamp before removing of the course
CourseSchema.pre('deleteOne',{document : true, query : false}, function (){
    console.log('this while deleting', this);
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model('Course',CourseSchema);