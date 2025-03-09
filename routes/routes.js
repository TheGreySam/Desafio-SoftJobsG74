const pool = require('../config/db');

const {softJobsLogin, softJobsRegister, softJobsProfile} = require('../controllers/controller');
const verifyToken = require('../middlewares/middlewares');

module.exports = app => {
    app.post('/login', softJobsLogin);
    app.post('/register', softJobsRegister);
    app.get('/profile', verifyToken, softJobsProfile);
}
//ruta login que recibe credenciales de usuario y devuelve un token generado con con JWT
