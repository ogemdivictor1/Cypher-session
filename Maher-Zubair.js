const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

const __path = process.cwd();

let server = require('./qr');   // fixed: matches qr.js
let code = require('./pair');

require('events').EventEmitter.defaultMaxListeners = 500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/qr', server);
app.use('/code', code);

app.use('/pair', (req, res) => {
  res.sendFile(path.join(__path, 'pair.html'));
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__path, 'main.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;
