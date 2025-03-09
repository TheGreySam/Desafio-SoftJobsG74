const express = require('express');
const router = require('./routes/routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require('cors');
const port = 3000;

app.use(router);

app.use(cors());
app.use(express.json());
app.use('/api', router);   
app.listen(port, () => {
    console.log(`Servidor corrien en puerto ${port}`);
});