const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//ruta login 
 const softJobsLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).json({ message: 'Tu usuario o contraseña es incorrecto' });
        const user = result.rows[0];
        const Encriptado = await bcrypt.compare(password, user.password);
        if (!Encriptado) return res.status(400).json({ message: 'Tu usuario o contraseña es incorrecto' });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });
        res.json({ token });
    } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' }

        )
    }
};

//ruta registrarse
 const softJobsRegister = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;
    //const response = await pool.query('INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await pool.query('INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)', [email, hashedPassword, rol, lenguage]);
        res.json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });  

}};

// ruta usuario logueado
    const softJobsProfile = async (req, res) => {
        const email = req.userEmail;
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            const user = result.rows[0];
            res.json({ email: user.email, rol: user.rol, lenguage: user.lenguage });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    };

module.exports = { softJobsLogin, softJobsRegister, softJobsProfile
}