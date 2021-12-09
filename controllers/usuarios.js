
const { response } = require('express');
const usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const usuarios = await usuario
        .find()
        .sort('-online')

    res.json({
        ok: true,
        usuarios
    })
}

module.exports = {
    getUsuarios
}