const express = require('express');
const routes = require('./routes/routes');

const app = express();
const cors = require('cors');
const port = 3000;

app.use(routes);

app.listen(port, () => {
    console.log(`Servidor corrien en puerto ${port}`);
});
app.use(cors());
app.use(express.json());
