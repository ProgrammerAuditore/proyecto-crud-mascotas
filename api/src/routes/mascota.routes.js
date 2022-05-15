const router = require('express').Router();
const Mascota = require('../models/Mascota');
const API = '/api/v1/mascota';

// Crear
router.post(`${API}/`, async (req, resp, next) => {
    try {
        const {nombre, raza, edad, enfermedades} = req.body;

        const mascota = new Mascota({
            nombre, raza, edad, enfermedades
        });

        const data = await mascota.save();
        
        resp.status(200).json({status:200, message:'Mascota registrada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Eliminar
router.delete(`${API}/:_id`, async (req, resp, next) => {
    try {
        const _id = req.params._id;

        const data = await Mascota.findByIdAndDelete(_id);

        resp.send({status:200, message:'Mascota eliminada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Actualizar
router.put(`${API}/:_id`, async (req, resp, next) => {
    try {
        const _id = req.params._id;
        const {nombre, raza, edad, enfermedades} = req.body;

        const data = await Mascota.findByIdAndUpdate(_id,{
            nombre, raza, edad, enfermedades
        });

        resp.send({status:200, message:'Mascota modificada', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Consultar
router.get(`${API}/:_id`, async (req, resp, next) => {
    try {
        const _id = req.params._id;
        const data = await Mascota.findById(_id);

        resp.status(200).send({status:200, message:'Mascota obtenida', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get(`${API}/search/:nombre`, async (req, resp, next) => {
    try {
        const nombre = req.params.nombre;
        const data = await Mascota.find({nombre: new RegExp(nombre, 'i')}).exec();

        resp.status(200).send({status:200, message:'Mascota obtenida', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Listar
router.get(`${API}/`, async (req, resp, next) => {
    try {
        const data = await Mascota.find();

        resp.send({status:200, message:'Listar mascota', data: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;