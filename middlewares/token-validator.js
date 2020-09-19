
const jwt = require('jsonwebtoken');

const validateToken = ( req, res, next ) => {

    try {
        
        console.log( req.header );
        
        const token = req.header('x-token');
    
        console.log( token );

        if ( !token ) {
            return res.status(401).json({
                ok: false,
                message: 'unauthorized request'
            });
        }

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();

    } catch ( error ) {

        console.log( error );

        res.status(401).json({
            ok: false,
            message: 'unauthorized request'
        });
    }
};


module.exports = {
    validateToken,
}