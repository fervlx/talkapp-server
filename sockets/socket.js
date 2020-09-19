const { io } = require('../index');

const Bands = require('../models/bands');
const Band  = require('../models/band');

const bands = new Bands();
bands.add( new Band( 'Linkin Park' ));
bands.add( new Band( 'Metallica' ));
bands.add( new Band( 'LPDA' ));
bands.add( new Band( 'LVP' ));
bands.add( new Band( 'Attaque 77' ));
bands.add( new Band( 'La Renga' ));

//console.log( bands );

//test
io.on('connect', client => {
    
    client.emit('active-bands', bands.getAll() );

    client.on('vote-band', ( payload ) => {
        
        //payload = { id: bandid }
        bands.vote( payload.id );
        //emit for everybody
        io.emit('active-bands', bands.getAll() );
    });

    client.on('add-band', ( payload ) => {

        // payload = { name: ... }
        bands.add( new Band( payload.name ));

        //notify all
        io.emit('active-bands', bands.getAll() );
    });

    client.on('delete-band', ( payload ) => {

        // payload = { id: ... }
        bands.delete( payload.id );

        //notify all
        io.emit('active-bands', bands.getAll() );
    });

    client.on('disconnect', () => { 
        console.log( "cliente desconectado", client.id );
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