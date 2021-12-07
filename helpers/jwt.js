const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        //Generar payload
        const payload = {
            uid
        };

        //Firmar el jwt
        jwt.sign(payload, process.env.JWT_KEY, {
            //Tiempo de expiracion
            expiresIn: '10h'
        }, (err, token) => {
            if (err) {
                reject('No se genero el JWT')
            } else {
                //token
                resolve(token);
            }
        })
    });
}

const comprobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null]
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
}