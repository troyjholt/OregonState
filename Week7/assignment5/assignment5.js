var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6329);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/gData', function(req, res) {
    var context = {};
    context.dataType = "GET";
    context.param = [];
    for (var p in req.query)
    {
        context.param.push({'name':p,'value':req.query[p]})
    }
    context.dataList = context.param;
    res.render('gData', context);
});

app.post('/gData', function (req, res)
{
    var context = {};
    context.dataType = "POST";
    context.pParam = [];
    for (var p in req.body)
    {
        context.pParam.push({'name':p,'value':req.body[p]})
    }
    context.dataList = context.pParam;
    res.render('gData', context)
});

app.use(function(req,res){
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
