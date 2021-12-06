const express = require('express');
const app = express();

const PORT = 8030;

app.get('/', (req, res) => {
    res.send({'message': 'all work'})
  })
  
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })