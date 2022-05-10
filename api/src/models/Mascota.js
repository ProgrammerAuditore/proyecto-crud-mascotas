const mongoose = require('mongoose');

const nombre = {type: 'String', require: true};

const raza = {type: 'String', require: true};

const edad = {type: 'Number', require: true};

 
// Crear un objetos de todas las enfermedades
/* const SchemaEnfermedades = mongoose.Schema({ 
    id: {type: 'Number', require: false},
    enfermedad: {type: 'String', require: false}
},{_id:false});

const enfermedades = {type: [SchemaEnfermedades], require: false, default: undefined} 
*/

const enfermedades = [{type: 'String', require: false}];

const SchemaMascota = mongoose.Schema(
    {nombre, edad, raza, enfermedades}, 
    {timestamps: true, versionKey: false}
);

module.exports = mongoose.model("Mascota", SchemaMascota);