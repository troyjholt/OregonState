var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_holttr',
    password: '6329',
    database: 'cs290_holttr'
});

module.exports.pool = pool;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6329);



/*app.get('/', function (req, res, next)
{
    var context = {};
    res.render('home', context);
});*/



// Code from the assignment page.

/*app.get('/', function (req, res, next)
{
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function (err)
    { //replace your connection pool with the your variable containing the connection pool
        console.log("Table is being dropped");
        var createString = "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        pool.query(createString, function (err)
        {
            context.results = "Table reset";
            res.render('home', context);
        })
    })
});*/

app.get('/insert', function (req, res, next)
{
    var context = {};
    res.render('home', context);
});

/*app.get('/insert', function (req, res, next)
{
    var context = {};
    context.requestType = "GET";
    context.param = [];
    mysql.pool.query('SELECT * FROM workouts', function (err, rows, fields)
    {
        if (err)
        {
            next(err);
            return;
        }
        context.dataList = context.param;
        context.results = JSON.stringify(rows);
        console.log(context.results);

    });
    res.render('home', context);
});*/

app.post('/insert', function (req, res, next)
{
    var context = {};
    context.requestType = "POST";
    console.log(req.body);
    console.log("This is kinda working");
    //pool.query(
    //    'CREATE TABLE IF NOT EXISTS workouts(' +
    //    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    //    'name VARCHAR(255) NOT NULL,' +
    //    'reps INT,' +
    //    'weight INT,' +
    //    'date DATE,' +
    //    'lbs BOOLEAN)',
    //    function (err, result)
    //    {
    //        if (err) throw err;
    //        console.log('Table created');
    //    }
    //);
    //pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
    //    [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit],

    //    function (err, result)
    //    {
    //        if (err)
    //        {
    //            next(err);
    //            return;
    //        }
    //        console.log("Post worked maybe");
    //        context.results = "Inserted id " + result.insertId;
    //        context.inserted = result.insertID
    //        res.send(JSON.stringify(context));
    //        res.render('home', context);
    //    });
    res.render('home', context);
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