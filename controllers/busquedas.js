const { response } = require('express');

const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');
const Hospitales = require('../models/hospital');

// getTodo

const busquedaTotal = async(req, res) => {

    const param = req.params.param;
    const regex = new RegExp(param, 'i') // expresion regular


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({
            nombre: regex
        }),
        Medicos.find({
            nombre: regex
        }),
        Hospitales.find({
            nombre: regex
        })
    ])

    try {

        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }

}


const getDocumentosColeccion = async(req, res) => {

    const tabla = req.params.tabla;
    const param = req.params.param;
    const regex = new RegExp(param, 'i');


    let data = [];


    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({
                    nombre: regex
                })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');


            break;
        case 'hospitales':
            data = await Hospitales.find({
                    nombre: regex
                })
                .populate('usuario', 'nombre img');

            break;

        case 'usuarios':
            data = await Usuario.find({
                nombre: regex
            });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });


    }


    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    busquedaTotal,
    getDocumentosColeccion
}