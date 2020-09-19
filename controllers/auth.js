const { Response, response } = require('express');
const { generateJwt } = require('../helpers/jwt');

const User   = require('../models/user');
const bcrypt = require('bcryptjs');


const create = async ( req, res = Response ) => {

    const { email, password } = req.body;    

    try {
        
        const registered = await User.findOne({ email });

        if ( registered ) {
            return res.status(400).json({ 
                ok: false,
                message: 'the email has been registered'
            });
        }

        const user = new User( req.body );

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        const token = await generateJwt( user.id );

        res.json({
            ok: true,
            user,
            token,
            message: 'user has been created.'
        })

    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            ok: false,
            message: 'internal error'
         });
    }
};

const login = async ( req, res = Response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(404).json({
                ok: false,
                message: 'unregistered user'
            });
        }

        const validatePwd = bcrypt.compareSync( password, user.password );

        if ( !validatePwd ) {
            return res.status(400).json({
                ok: false,
                message: 'invalid password'
            });
        }

        const token = await generateJwt( user.id );

        res.json({
            ok: true,
            user,
            token,
            message: 'logged in'
        })

    } catch ( error ) {
        console.log( error );

        res.status(500).json({
            ok: false,
            message: 'internal error.'
        })
    }
};

const renewtoken = async ( req, res ) => {

    const uid = req.uid;

    try {
        
        const token = await generateJwt( uid );
        const user  = await User.findById( uid );

        res.json({
            ok: true,
            user,
            token,
            message: 'logged in'
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({ 
            ok: false,
            message: 'internal error'
        });
    }
}

module.exports = {
    create,
    login,
    renewtoken
}