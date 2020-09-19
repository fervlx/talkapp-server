const mongoose = require('mongoose');

const connectToDb = async() => {
    
    try {
        
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('db connected');

    } catch (error) {
        console.log( error );
        throw new Error(' error de conexion a la base de datos.');
    }
};

module.exports = {
    connectToDb,
}