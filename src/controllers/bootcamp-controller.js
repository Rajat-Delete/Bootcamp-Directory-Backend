const { BootcampService } = require('../service');
const {StatusCodes} = require('http-status-codes');


//desc    :    Get All Bootcamps
//@access :    Public
async function getBootcamps(request,response,next){
    try{
        const bootcamps = await BootcampService.getAllBootcamps();
        return response.status(StatusCodes.OK).json(bootcamps);
    }catch(error){
        console.log('error in fetching bootcamps');
    }
}

//desc    :    Get Bootcamp by Id
//@access :    Public
async function getBootcampById(request,response,next){
    try{
        const bootcamp = await BootcampService.getBootcampById(request.params.id);
        return response.status(StatusCodes.OK).json(bootcamp);
    }catch(error){
        console.log('error',error);
    }
}

//desc    :    Post Bootcamp
//@access :    Public
async function createBootcamp(request,response,next){
    try{
        //console.log('request>>',request.body); 
        const Bootcamp = await BootcampService.createBootcamp(request.body);
        //console.log('Bootcmamp is>>',Bootcamp); 
        return response.status(StatusCodes.OK).json(Bootcamp);
    }catch(error){
        console.log('error in bootcamp creation',error);
    }
}


//desc    :    Put Bootcamp
//@access :    Public
async function updateBootcampById(request,response,next){
    try{
        const bootcamp = await BootcampService.updateBootcampById(request.params.id,request.body);
        return response.status(StatusCodes.OK).json(bootcamp);
    }catch(error){
        console.log('error in update bootcamp',error);
    }
}


//desc    :    Delete Bootcamp
//@access :    Public
async function deleteBootcampById(request,response,next){
    try{
        const bootcamp = await BootcampService.deleteBootcampById(request.params.id);
        return response.status(StatusCodes.OK).json(bootcamp);
    }catch(error){
        console.log('error in delete bootcamp',error);
    }
}

//desc    :    Get All Bootcamps WithIn Radius
//@access :    Public
async function getBootcampWithinRadius(request,response,next){
    try{

    }catch(error){

    }
}

//desc    :    Upload Bootcamp Image
//@access :    Public
async function uploadBootcampPhoto(request,response,next){
    try{

    }catch(error){

    }
}


module.exports = {
    getBootcamps,
    getBootcampById,
    createBootcamp,
    updateBootcampById,
    deleteBootcampById,
    getBootcampWithinRadius,
    uploadBootcampPhoto,
}





