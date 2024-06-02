const { BootcampService } = require('../service');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/App-Error');


//desc    :    Get All Bootcamps
//@access :    Public
async function getBootcamps(request,response,next){
    try{
        const bootcamps = await BootcampService.getAllBootcamps();
        const bootcampCount = bootcamps.length;
        if(bootcampCount === 0){
            //throw response that no bootcamps exists in the database
            throw new AppError(`No Bootcamps exists`,StatusCodes.NOT_FOUND);
        }
        SuccessResponse.count = bootcampCount;
        SuccessResponse.data = bootcamps;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log('error in fetching bootcamps');
        ErrorResponse.error = error;
        ErrorResponse.Message = error.message;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

//desc    :    Get Bootcamp by Id
//@access :    Public
async function getBootcampById(request,response,next){
    try{
        const bootcamp = await BootcampService.getBootcampById(request.params.id);
        if(!bootcamp){
            throw new AppError(`No Bootcamp found with the Given Id ${request.params.id}`,StatusCodes.NOT_FOUND);
        }
        return response.status(StatusCodes.OK).json(bootcamp);
    }catch(error){
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}

//desc    :    Post Bootcamp
//@access :    Public
async function createBootcamp(request,response,next){
    try{
        const Bootcamp = await BootcampService.createBootcamp(request.body);
        SuccessResponse.data=Bootcamp;
        delete SuccessResponse.count;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log('error in bootcamp creation controller:::',error.name);
        if(error.name === "ValidationError"){
            console.log('printing incoming error object',error);
            ErrorResponse.message = error.message;
            ErrorResponse.error = error;
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        if(error.message.code === "E11000"){
            ErrorResponse.error = new AppError(`A Duplicate value has been passed in the Incoming Request`,StatusCodes.BAD_REQUEST);
            ErrorResponse.message = error.message;
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


//desc    :    Put Bootcamp
//@access :    Public
async function updateBootcampById(request,response,next){
    try{
        
        const bootcamp = await BootcampService.updateBootcampById(request.params.id,request.body);
        if(!bootcamp){
            ErrorResponse.message = `No Bootcamp exists for the Given Id ${request.params.id}`;
            ErrorResponse.error = new AppError(`No Bootcamp exists for the Given Id ${request.params.id}`,StatusCodes.NOT_FOUND);
            return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        delete SuccessResponse.count;
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log('error in update bootcamp controller::',error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


//desc    :    Delete Bootcamp
//@access :    Public
async function deleteBootcampById(request,response,next){
    try{
        const bootcamp = await BootcampService.deleteBootcampById(request.params.id);
        console.log('bootcamp for deletion>>',bootcamp);
        if(!bootcamp){
            ErrorResponse.message = `No Bootcamp exists for the Given Id ${request.params.id}`;
            ErrorResponse.error = new AppError(`No Bootcamp exists for the Given Id ${request.params.id}`,StatusCodes.NOT_FOUND);
            return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        };
        delete SuccessResponse.count;
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log('error in delete bootcamp',error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(Statuscode.INTERNAL_SERVER_ERROR).json(ErrorResponse);
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





