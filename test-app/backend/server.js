const express = require("express");

require("dotenv").config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

const PORT = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;

