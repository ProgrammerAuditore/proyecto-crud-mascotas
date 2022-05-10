const router = require('express').Router();
const Mascota = require('../models/Mascota');
const API = '/api/v1/mascota';

// Crear
router.post(`${API}/`, async (req, resp, next) => {
    console.log(req.body);
    try {
        const {nombre, raza, edad, enfermedades} = req.body;

        const mascota = new Mascota({
            nombre, raza, edad, enfermedades
        });

        const data = await mascota.save();
        console.log(data);
        
        resp.status(200).json({status:200, message:'Mascota registrada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Eliminar
router.delete(`${API}/:_id`, async (req, resp) => {
    console.log(req.body);
    try {
        const _id = req.params._id;

        const data = await Mascota.findByIdAndDelete(_id);
        console.log(data);

        resp.send({status:200, message:'Mascota eliminada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Modificar
router.put(`${API}/:_id`, async (req, resp) => {
    console.log(req.body);
    try {
        const _id = req.params._id;

        const data = await Mascota.findByIdAndUpdate(_id);
        console.log(data);

        resp.send({status:200, message:'Mascota modificada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Consultar
router.get(`${API}/:_id`, async (req, resp) => {
    console.log(req.body);
    try {
        const _id = req.params._id;

        const data = await Mascota.findById(_id);
        console.log(data);

        resp.send({status:200, message:'Mascota consultada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Listar
router.get(`${API}/`, async (req, resp) => {
    console.log(req.body);
    try {
        const data = await Mascota.find();
        console.log(data);

        resp.send({status:200, message:'Listar mascota', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;