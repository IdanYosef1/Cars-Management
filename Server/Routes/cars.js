const express = require('express');
const router = express.Router();
const bll = require('../BLL/carsBLL');

router.get('/',async (req,res) => {
    try{
        const cars = await bll.getAllCars();
        res.send(cars);
    }
    catch(err){
        res.send(err);
    }
});

router.get('/:id',async (req,res) => {
    try{
        const car = await bll.getCarById(req.params.id);
        res.send(car);
    }
    catch(err){
        res.send(err);
    }
});

router.post('/',async (req,res) => {
    try{
        const data = await bll.createCar(req.body);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
});

router.put('/:id',async (req,res) => {
    try{
        const data = await bll.updateCar(req.params.id, req.body);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
});

router.delete('/:id',async (req,res) => {
    try{
        const data = await bll.deleteCar(req.params.id);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
});

module.exports = router;