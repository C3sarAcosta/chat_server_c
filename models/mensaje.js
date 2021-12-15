const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    mensaje: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

//Sobreescribimos  el metodo toJSON
MensajeSchema.method('toJSON', function () {
    /*
    Extraer __v, _id, password
    ...Variable (Operador rest)
    */
    const { __v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model('Mensaje', MensajeSchema);