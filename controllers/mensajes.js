const Mensajes = require('../models/mensaje');

const obtenerChat = async (req, res) => {
    const miId = req.uid;
    const mensajesDe = req.params.de

    const mens = await Mensajes.find({
        $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
    })
        .sort({ createdAt: 'desc' });

    res.json({
        ok: true,
        mensajes: mens
    })
}

module.exports = {
    obtenerChat
}