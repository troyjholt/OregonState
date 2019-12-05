var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

/*var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_holttr',
    password: '6329',
    database: 'cs290_holttr'
});*/

//module.exports.pool = pool;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6329);


app.get('/', function (req, res, next)
{
    res.render('home');
});

app.post('/', function (req, res, next)
{
    var context = {};
    context.dataType = "It is Posting";
    
    console.log(context.stupidVar);
    res.render('home', context)
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