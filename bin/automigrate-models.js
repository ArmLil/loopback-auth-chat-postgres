
//To create tables for LoopBack remote models including built-in models and initialise users and roles

var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.dsPsql;


// to create empty models in db
ds.automigrate(null, function(err) {
  if (err) throw err;
  console.log('Finished migration');
  ds.disconnect();
});
