const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8030;
const mockapp = require('./api/mockapp')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/mockapp', mockapp);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
