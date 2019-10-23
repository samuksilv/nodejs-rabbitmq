const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();

const routeProducer = require('./controllers/producer');

const port = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use("/api", routeProducer);

app.listen(port, async (req, res) => {
    console.log(`Example app listening on port ${port}!`.green);
});

app.get("/", async (req, res, next) => {
    res.status(200).send(`Example app listening on port ${port}!`);
});