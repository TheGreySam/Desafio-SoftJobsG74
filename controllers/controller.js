const pool = require('../config/db');

//ruta login 
 const softJobsLogin = async (req, res) => {
    const { email, password } = req.body;
    const response = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = response.rows[0];
    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return res.json({ auth: true, token });
        }
    }
    return res.status(400).json({ auth: false });
}

//ruta registrarse
 const softJobsRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const response = await pool.query('INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    if (response) {
        return res.json({ auth: true });
    }
    return res.status(400).json({ auth: false });
}

// ruta usuarios 
 const softJobsProfile = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios WHERE id = $1', [req.userId]);
    return res.json(response.rows[0]);
}

module.exports = { softJobsLogin, softJobsRegister, softJobsProfile
}