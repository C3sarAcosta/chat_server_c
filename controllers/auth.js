const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");

const crearUsuario = async (req, res = response) => {
    //Crear una instancia del modelo
    const usuario = new Usuario(req.body);
    //Guardamos en la base de datos
    await usuario.save();

    res.json({
        ok: true,
        msg: "Creando usuario"
    });
}

module.exports = {
    crearUsuario
}