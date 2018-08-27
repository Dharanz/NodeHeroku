const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = process.env.PORT || 3000;
const app = express();

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.get('/test', (req, res) => {
    res.send('Deployed!');
  });

app.listen(port, () => console.log('Server Started!'));