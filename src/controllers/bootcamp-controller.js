

//desc    :    Get All Bootcamps
//@access :    Public
async function getBootcamps(request,response,next){
    try{
        return response.status(200).json({'Success' : 'true','Data' : {}});
    }catch(error){

    }
}

//desc    :    Get Bootcamp by Id
//@access :    Public
async function getBootcampById(request,response,next){
    try{

    }catch(error){

    }
}

//desc    :    Post Bootcamp
//@access :    Public
async function createBootcamp(request,response,next){
    try{

    }catch(error){

    }
}


//desc    :    Put Bootcamp
//@access :    Public
async function updateBootcampById(request,response,next){
    try{

    }catch(error){

    }
}


//desc    :    Delete Bootcamp
//@access :    Public
async function deleteBootcampById(request,response,next){
    try{

    }catch(error){

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





