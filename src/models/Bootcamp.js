const mongoose = require('mongoose');
const slugify = require('slugify');
const {Geocoder} = require('../utils/common/');

const BootcampSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Please enter the bootcamp name'],
        unique : true,
        trim : true,
        maxlength : [50 ,'Please enter a name less than 50 charcaters']
    },
    slug : String,
    description : {
        type : String,
        required : [true ,'Please enter the description of Bootcamp'],
        maxlength : [500 , 'Please enter description less than 500 characters']
    },
    website : {
        type : String,
        match : [/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Pleae enter a valid url with HTTP or HTTPS'],
    },
    phone : {
        type : String,
        required : [true ,'Please enter a phone number'],
        maxlengh : [20 ,'Please enter a phone number less than 20 characters']
    },
    email :{
        type : String,
        required : [true , 'Please enter a Email Id of Bootcamp'],
        match : [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,'Please enter a valid EmailId of Bootcamp']
    },
    address :{
        type : String,
        required : [true, 'Please enter the address of Bootcamp'],
    },
    location : {
        type :{
            type : String,
            enum : ['Point']
        },
        coordinates : {
            type : [Number],
            index : '2dsphere',
        },
        formattedAddress : String,
        street : String,
        city : String,
        state : String,
        zipcode : String,
    },
    careers : {
        type : [String],
        required : true,
        enum : ["Web Development","Mobile Development","UI/UX","Data Science","Business","Others"],
    },
    averageRating :{
        type : Number,
        min : [1 ,'Please enter a rating more than 1'],
        max : [10 ,'Please enter a rating less than 10'],
    },
    averageCost : Number,
    photo : {
        type : String,
        default : 'no-photo.jpg',
    },
    housing : {
        type : Boolean,
        default : false,
    },
    jobAssistance : {
        type : Boolean,
        default : false,
    },
    jobGuarantee : {
        type : Boolean,
        default : false,
    },
    acceptGi :{
        type : Boolean,
        default : false,        
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
},{
    toJSON : {virtuals : true},
    toObject : {virtuals : true},
});

//doing the slug creation from the bootcamp name
BootcampSchema.pre('save', function(next){
    console.log('slugify ran');
    this.slug = slugify(this.name,{lower : true});
    next();
});

//forming the location of the Bootcamp from Incoming address

BootcampSchema.pre('save', async function(next){
    console.log('inside geocoder::',this.address);
    console.log('geocoder',Geocoder);
    const location = await Geocoder.geocode(this.address);
    console.log('lcoation data from the mapquest api',location);

    this.location = {
        type : 'Point',
        coordinates : [location[0].latitude,location[0].longitude],
        formattedAddress : location[0].formattedAddress,
        street : location[0].streetName,
        city : location[0].city,
        state : location[0].stateCode,
        zipcode : location[0].zipcode,
    }
    //setting the address to avoid it getting setted in DB
    this.address = undefined;
    next();
});

//cascade delete the Course when the bootcamp is deleted
// BootcampSchema.pre('deleteOne', async function cascadeDelete(next){
//     console.log('Bootcamp getting deleted from middleware is', this);
//     await this.model('Course').deleteMany({ bootcamp : this._id});
//     next();
// })



//adding virtuals for getting courses in Bootcamps
BootcampSchema.virtual('Courses',{
    ref : 'Course',
    localField : '_id',
    foreignField : 'bootcamp',
    justOne : false,
})

module.exports = mongoose.model('Bootcamp',BootcampSchema);