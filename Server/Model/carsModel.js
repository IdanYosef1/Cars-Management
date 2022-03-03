const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carsSchema = new schema({
    model: {type:String ,required:true} ,
    color: {type:String ,required:true} ,
    numOfWheels: {type:Number, min:1, required:true} 
});

module.exports = mongoose.model('cars', carsSchema);
