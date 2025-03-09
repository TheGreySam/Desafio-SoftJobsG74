const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    console.log('Petición recibida con éxito');
    next();
}


 module.exports = verifyToken; 
