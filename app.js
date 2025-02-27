const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!');
});
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
