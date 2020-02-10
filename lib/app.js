const express = require('express');
const app = express();

app.use(require('./routes/recipes'));
app.use(require('./routes/events'));


module.exports = app;
