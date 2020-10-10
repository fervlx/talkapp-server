
const { response } = require('express');

const user = require('../models/user');

const updateConnectionState = async ( uid = '', state = false ) => {

    try {
        
        console.log("data", uid, state );
        const usr = await user.findById( uid );
        usr.online = state;
        await usr.save();

        return usr;

    } catch (error) {
        console.log( error );
        throw error;
    }
};

const getUsers = async ( req, res = response ) => {

    try {
     
        const offset = Number( req.query.offset ) || 0;

        const users = await user
        .find({ _id: { $ne: req.uid }})
        .sort('-online') //ordena ascendente
        .skip(offset)
        .limit(20)

        res.json({
            ok: true,
            users
        });

    } catch (error) {
        res.json({
            ok: false,
            message: 'internal error',
        });
    }
};


module.exports = {
    updateConnectionState,
    getUsers,
}