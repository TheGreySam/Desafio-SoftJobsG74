const jwt = require('jsonwebtoken');
require('dotenv').config();
const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.userEmail = decoded.email;
        next();
    });
}


 module.exports = verificarToken; 
