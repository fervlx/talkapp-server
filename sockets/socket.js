const { io } = require('../index');

const { verifyToken } = require('../helpers/jwt');
const { updateConnectionState } = require('../controllers/user');


//test
io.on('connect', client => {
    
    console.log('connected client');
    //console.log( client.handshake.headers );
    
    const token = client.handshake.headers['x-token'];
    const [ valid, uid ] = verifyToken( token );
    
    if ( !valid ) {
        client.disconnect();
        return;
    }

    updateConnectionState( uid, true );
    //console.log( "valid client", valid, uid );

    client.on('disconnect', () => { 
        //console.log( "cliente desconectado", client.id );
        updateConnectionState( uid, false );
    });

    // client.on('message', ( payload ) => {
    //     console.log( payload );
    // });

    // client.on('emitMessage', ( payload ) => {
    //     console.log( payload );
    //     //io.emit( 'receiveMessage', 'Hola cliente' ); emite a todos
    //     client.broadcast.emit( 'receiveMessage', payload ); //emite a todos menos al que lo emitio
    // });
    //emite a todos los cliente conectados
    // io.emit('message', { admin: 'mensaje recibido.' });
});