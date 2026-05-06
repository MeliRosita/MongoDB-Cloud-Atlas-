const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    clave: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    cantidadDisponible: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Material', MaterialSchema);