const Bootcamp = require('../models/Bootcamp');
const { Geocoder } = require('../utils/common')

async function createBootcamp(data){
    try {
        const bootcamp = await Bootcamp.create(data);
        return bootcamp;
    } catch (error) {
        console.log('error in create Bootcamp',error);
        throw error;
    }
}

async function getAllBootcamps(){
    try {
        const Bootcamps = await Bootcamp.find();
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
        const bootcamp = await Bootcamp.findByIdAndDelete(id);
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

