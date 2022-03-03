const model = require('../Model/carsModel');

const getAllCars = () => {
    return new Promise((resolve,reject) => {
        model.find({},(err,cars) => {
            if(err){
                reject(err);
            }
            else{
                resolve(cars);
            }
        });
    });
}

const getCarById = (id) => {
    return new Promise((resolve,reject) => {
        model.findById(id,(err,car) => {
            if(err){
                reject(err);
            }
            else{
                resolve(car);
            }
        });
    });
}

const createCar = (objCar) => {
    return new Promise((resolve,reject) => {
        const car = new model(objCar);
        car.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Added successfully");
            }
        });
    });
}

const updateCar = (id,objcar) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndUpdate(id,objcar,(err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Updated successfully");
            }
        });
    });
}

const deleteCar = (id) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndDelete(id,(err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Deleted successfully");
            }
        });
    });
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};