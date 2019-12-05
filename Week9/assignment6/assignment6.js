const express = require('express')
const app = express()
const port = 6329

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_holttr',
    password: '6329',
    database: 'cs290_holttr'
});

module.exports.pool = pool;

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
        pool.query(
        'create table if not exists workouts(' +
        'id int primary key auto_increment,' +
        'name varchar(255) not null,' +
        'reps int,' +
        'weight int,' +
        'date date,' +
        'lbs boolean)',
        function (err, result)
        {
            if (err) throw err;
            console.log('table created');
        }
    );
    pool.query("insert into workouts (`name`, `reps`, `weight`, `date`, `lbs`) values (?, ?, ?, ?, ?)",
        [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit],

        function (err, result)
        {
            if (err)
            {
                next(err);
                return;
            }
            console.log("post worked maybe");
            context.results = "inserted id " + result.insertid;
            context.inserted = result.insertid
            res.send(json.stringify(context));
            res.render('workout', context);
        });

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

