
const { Router } = require('express');


const { getUsers } = require('../controllers/user');
const { validateToken } = require('../middlewares/token-validator');


const router = Router();
router.get('/', validateToken, getUsers );


module.exports = router;
