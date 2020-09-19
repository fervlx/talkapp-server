const jwt = require('jsonwebtoken');

const generateJwt = ( uid ) => {

    return new Promise(( resolve, reject ) => { 
        
        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, { 
            expiresIn: '24h'
        }, ( err, token ) => {
            
            if ( !err ) 
                resolve( token );
            else 
                reject( err ) 
        });
    });
};


module.exports = {
    generateJwt,
}