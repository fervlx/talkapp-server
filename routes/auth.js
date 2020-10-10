
const { Router } = require('express');
const { check }  = require('express-validator');


const { create, login, renewtoken } = require('../controllers/auth');
const { validateToken } = require('../middlewares/token-validator');
const { validateUser } = require('../middlewares/user-validator');


const router = Router();


router.post('/new', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateUser
], create );


router.post('/', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty()
], login );


router.get('/renewToken', [
    validateToken
], renewtoken );

module.exports = router;
