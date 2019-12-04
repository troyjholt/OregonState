var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var mysql = require('/dbcon.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6329);







app.get('/', function (req, res, next)
{
    var context = {};
    res.render('home', context);
});

app.use(function(req,res, next){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

// Code from the assignment page.

/*app.get('/', function (req, res, next)
{
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function (err)
    { //replace your connection pool with the your variable containing the connection pool
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
    });
*/

pool.query(
    'CREATE TABLE IF NOT EXISTS workouts(' +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'name VARCHAR(255) NOT NULL,' +
    'reps INT,' +
    'weight INT,' +
    'date DATE,' +
    'lbs BOOLEAN)',
    function (err, result)
    {
        if (err) throw err;
        console.log('Table created');
    }
);

app.get('/insert', function (req, res, next)
{
    var context = {};
    context.dataType = "GET";
    
    mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)",
         [req.body['name'], req.body['reps'], req.body['weight'], req.body['date'], req.body['lbs']],

        function (err, result)
        {
            if (err)
            {
                next(err);
                return;
            }
            context.results = "Inserted id " + result.insertId;
            res.render('home', context);
        });
    res.render('insert', context);
});

app.post('/insert', function (req, res, next)
{
    var context = {};
    context.dataType = "POST";
    
    pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)",
         [req.body['name'], req.body['reps'], req.body['weight'], req.body['date'], req.body['lbs']],

        function (err, result)
        {
            if (err)
            {
                next(err);
                return;
            }
            context.results = "Inserted id " + result.insertId;
            res.render('home', context);
        });
    res.render('insert', context);
});