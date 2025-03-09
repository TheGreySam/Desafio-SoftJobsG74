const pool = require('../config/db');
const express = require('express');
const {softJobsLogin, softJobsRegister, softJobsProfile} = require('../controllers/controller');
const verificarToken = require('../middlewares/middlewares');

const router = express.Router();

router.post('/login', softJobsLogin);
router.post('/usuarios', softJobsRegister); 
router.get('/profile', verificarToken, softJobsProfile);

module.exports = router;
