var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_holttr',
  password        : '6329',
  database        : 'cs290_holttr'
});

module.exports.pool = pool;
