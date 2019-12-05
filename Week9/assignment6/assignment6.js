const express = require('express')
const app = express()
const port = 6329

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_holttr',
    password: '6329',
    database: 'cs290_holttr'
});*/

//module.exports.pool = pool;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', port);

app.get('/', function (req, res, next)
{
    res.render('workout');
});

app.post('/insert', function (req, res, next)
{
    var context = {};

    console.log('executing post');

    res.send("hello");
});
app.get('/insert', function (req, res, next)
{
    var context = {};

    console.log('executing get');
    res.render('workout', context);
});

app.use(function (req, res, next)
{
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next)
{
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function ()
{
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

