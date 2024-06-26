const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bootcamp = require('../models/Bootcamp');
const path = require('path');
const Course = require('../models/Course');

//loading the dotenv configs
dotenv.config({path:__dirname+'/./../../.env'});

//database connect
mongoose.connect(process.env.MONGODB_URI);
console.log('database conncted');

//reading the testing data
console.log(__dirname+'../_data/bootcamps.json');
const bootcamps = JSON.parse(fs.readFileSync(path.join(__dirname,'..','_data','bootcamps.json')));
const courses = JSON.parse(fs.readFileSync(path.join(__dirname,'..','_data','courses.json')));
console.log('data of bootcamps',bootcamps);


//function for inserting the data in the Database
async function insertData(){
    try {
        console.log('Data Imported');
        //await Bootcamp.insertMany(bootcamps);
        await Course.create(courses);
        process.exit();
    } catch (error) {
        console.log('error in inserting the data',error);
    }
}

async function deleteData(){
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Deleted');
        process.exit();
    } catch (error) {
        console.log('Data deleted');
    }
}

if(process.argv[2] === 'i'){
    insertData();
}else if (process.argv[2] === 'd'){
    deleteData();
}

