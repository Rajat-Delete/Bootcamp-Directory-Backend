const Bootcamp = require('../models/Bootcamp');
const { Geocoder } = require('../utils/common');
const Course = require('../models/Course');

async function createBootcamp(data){
    try {
        const bootcamp = await Bootcamp.create(data);
        return bootcamp;
    } catch (error) {
        console.log('error in create Bootcamp',error);
        throw error;
    }
}

async function getAllBootcamps(request){
    try {
        console.log(request.query);

        //copy of the incoming request query
        let reqQuery = {...request.query};

        //remove some fields from the incoming query
        const removeFields = ['select','sort','page','limit'];

        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);

        //match the gte,gt,lte,lt,in and replace it with $ and the matched regex
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=> `$${match}`);

        query = Bootcamp.find(JSON.parse(queryStr)).populate('Courses');

        //find only selected fields
        if(request.query.select){
            //console.log(request.query.select);
            const fields = request.query.select.split(',').join(' ');
            query.select(fields);
        }

        //doing the sorting of the fields else sort as per the decreasing order of insertion
        if(request.query.sort){
            const sortBy = request.query.sort.split(',').join(' ');
            //console.log(sortBy);
            query.sort(sortBy);
        }else{
            query.sort('-createdAt');
        }

        //applying pagination on the bootcamps data
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 25;
        const startIndex = (page - 1)*limit;
        const endIndex = page * limit;
        const total = await Bootcamp.countDocuments();

        //making paginated object
        const pagination = {};
       if(endIndex<total){
         pagination.next = {
            'page' : page+1,
            'limit' : limit
         }
       }

       if(startIndex>0){
        pagination.prev = {
            'page' : page-1,
            'limit' : limit
        }
       }

        //finding the pagenated bootcamps
        query.skip(startIndex).limit(limit);
        const Bootcamps = {};
        Bootcamps.data = await query;
        Bootcamps.pagination = pagination;
        console.log('Bootcamps object',Bootcamps);
        return Bootcamps;
    } catch (error) {
        console.log(`An error in fecthing all Bootcamps`);
        throw error;
    }
}

async function getBootcampById(id){
    try {
        const bootcamp = await Bootcamp.findById(id);
        return bootcamp;
    } catch (error) {
        console.log(`An error in fecthing Bootcamp`);
        throw error;
    }
}

async function updateBootcampById(id,data){
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(id,data,{
            new : true,
            runValidators : true
        });
        return bootcamp;
    } catch (error) {
        console.log('error in updateBootcamp',error);
        throw error;
    }
    
}

async function deleteBootcampById(id){
    try {
        const bootcamp = await Bootcamp.findById(id);
        console.log('bootcamp',bootcamp);
        await bootcamp.deleteOne();
        await Course.deleteMany({bootcamp : id});
        return bootcamp;
    } catch (error) {
        console.log('error in deleting deleting bootcamp',error);
        throw error;
    }
}

async function getBootcampsWithinRadius(zipcode,distance){
    try {
        //fetching the longitude and latitude from the zipcode
        const loc = await Geocoder.geocode(zipcode);
        const longitude = loc[0].longitude;
        const latitude = loc[0].latitude;
        //console.log(zipcode,distance,longitude,latitude);

        //calculating the radius 
        const radius = distance/3963;

        const bootcamps = await Bootcamp.find({
            location : {
                $geoWithin : { $centerSphere : [[longitude,latitude],radius] }
            }
        });
       // console.log('bootcamps from api are',bootcamps);
        return bootcamps;
    } catch (error) {
        console.log('error in bootcamp find within radius',error);
        throw error;
    }
}



module.exports ={
    createBootcamp,
    getAllBootcamps,
    getBootcampById,
    updateBootcampById,
    deleteBootcampById,
    getBootcampsWithinRadius,
}

