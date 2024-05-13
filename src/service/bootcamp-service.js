const Bootcamp = require('../models/Bootcamp');

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
        if(!bootcamp){
            //will throw error here
        }
        return bootcamp;
    } catch (error) {
        console.log(`An error in fecthing Bootcamp`);
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



module.exports ={
    createBootcamp,
    getAllBootcamps,
    getBootcampById,
    updateBootcampById,
    deleteBootcampById,
}