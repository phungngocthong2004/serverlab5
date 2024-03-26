const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.json());

const appMobile = require("./api");

// Use routes
app.use('/api', appMobile);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const db = require("./db");
const uri = db.uri