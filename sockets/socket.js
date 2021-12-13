const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt')
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido) {
        return client.disconnect();
    }
    console.log('Cliente autenticado');
    usuarioConectado(uid);

    //Meter al usuario a un canal
    client.join(uid);

    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', (payload) => {
        console.log(payload);
        //Emitir mensaje a un canal
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
