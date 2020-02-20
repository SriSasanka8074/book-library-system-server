const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./config/config');
const appRoutes = require('./routes/app');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.set('/db', path.join(__dirname, '/db'));
// app.use((req, res, next) => {})

app.use('/api', appRoutes);

app.listen(config.port, () => {
    console.log('Server up and running!');
});

module.exports = app;