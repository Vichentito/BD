const express = require('express');
const bodyParser = require('body-parser');
const parser = require('js-sql-parser');
var app = require('express')();
var server = require('http').Server(app);
var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
server.listen(port, () => console.log('Servidor iniciado en 8080'));

app.get('/', function (req, res) {
    console.log("hola");

    res.sendFile(__dirname + '/public/index.html');
});


app.post('/validate', function (req, res) {
    try {
        const ast = parser.parse(req.body.select);
        res.send({content: parser.stringify(ast)}); 
    } catch (error) {
        res.send({content: "error"});
    }

});