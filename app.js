const express = require('express');
const app = express();

const os = require('os');

app.get('/', (req, res) => {
    res.json({process: process.pid, os: os.hostname()})
});

module.exports = app;