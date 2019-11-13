// JavaScript source code


app.get('/get-loopback', function (req, res)
{
    var qParams = "";
    for (var p in req.query)
    {
        qParams += "The name " + p + " contains the value " + req.query[p] + ", ";
    }
    qParams = qParams.substring(0, qParams.lastIndexOf(','));
    qParams += '.';
    var context = {};
    context.dataList = qParams;
    res.render('get-loopback', context);
});

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6329);

app.get('/show-data', function (req, res)
{
    var context = {};
    context.sentData = req.query.myData;
    res.render('show-data', context);
});

app.get('/get-loopback', function (req, res)
{
    var qParams = "";
    for (var p in req.query)
    {
        qParams += "The name " + p + " contains the value " + req.query[p] + ", ";
    }
    qParams = qParams.substring(0, qParams.lastIndexOf(','));
    qParams += '.';
    var context = {};
    context.dataList = qParams;
    res.render('get-loopback', context);
});

app.listen(app.get('port'), function ()
{
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});