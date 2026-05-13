require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Material = require('./materialSchema');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');
    })
    .catch((error) => {
        console.log('Error al conectar con MongoDB Atlas:');
        console.log(error.message);
    });


// CREATE - Crear material
app.post('/materiales', async (req, res) => {
    try {
        const nuevoMaterial = new Material({
            clave: req.body.clave,
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            cantidadDisponible: req.body.cantidadDisponible,
            ubicacion: req.body.ubicacion,
            estado: req.body.estado
        });

        const resultado = await nuevoMaterial.save();

        res.json({
            mensaje: 'Material creado correctamente',
            material: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear material',
            error: error.message
        });
    }
});


// READ - Leer todos los materiales
app.get('/materiales', async (req, res) => {
    try {
        const materiales = await Material.find();

        res.json(materiales);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar materiales',
            error: error.message
        });
    }
});


// READ - Buscar material por clave
app.get('/materiales/:clave', async (req, res) => {
    try {
        const material = await Material.findOne({
            clave: req.params.clave
        });

        if (!material) {
            return res.status(404).json({
                mensaje: 'No se encontró el material'
            });
        }

        res.json(material);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar material',
            error: error.message
        });
    }
});


// UPDATE - Actualizar material por clave
app.put('/materiales/:clave', async (req, res) => {
    try {
        const materialActualizado = await Material.findOneAndUpdate(
            { clave: req.params.clave },
            {
                nombre: req.body.nombre,
                categoria: req.body.categoria,
                cantidadDisponible: req.body.cantidadDisponible,
                ubicacion: req.body.ubicacion,
                estado: req.body.estado
            },
            { new: true }
        );

        if (!materialActualizado) {
            return res.status(404).json({
                mensaje: 'No se encontró el material para actualizar'
            });
        }

        res.json({
            mensaje: 'Material actualizado correctamente',
            material: materialActualizado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar material',
            error: error.message
        });
    }
});


// DELETE - Eliminar material por clave
app.delete('/materiales/:clave', async (req, res) => {
    try {
        const materialEliminado = await Material.findOneAndDelete({
            clave: req.params.clave
        });

        if (!materialEliminado) {
            return res.status(404).json({
                mensaje: 'No se encontró el material para eliminar'
            });
        }

        res.json({
            mensaje: 'Material eliminado correctamente',
            material: materialEliminado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar material',
            error: error.message
        });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});