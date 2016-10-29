var express = require('express');
var app = express();

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/build/index.html');
    //res.send('It is just API Server...');
});

app.use(express.static(__dirname + '/build'));