var express = require('express');
var materialize = require('materialize-css');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var port = 8080;


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/courses', function(req, res) {
    fs.readFile('courses.json', 'utf8', function(err, data) {
        var courses = JSON.parse(data);
        res.locals = { courses: courses };
        res.render('courses.ejs');
    });
});

app.get('/courses/:id', function(req, res) {
    fs.readFile('courses.json', 'utf8', function(err, data) {
        var courses = JSON.parse(data);
        var course = courses.filter( function(obj) {
            return obj.id === parseInt(req.params.id);
        })[0];
    res.locals = { course: course };
    res.render('course.ejs');
    });
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + 'contact.html');
})

app.listen(port);
console.log('Server running on http://localhost:' + port);