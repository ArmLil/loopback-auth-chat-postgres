'use strict'

// If there are existing tables in a database, running automigrate() will drop and re-create the tables: Therefore, data will be lost. To avoid this problem, use autoupdate(). Instead of dropping tables and recreating them, autoupdate() calculates the difference between the LoopBack model and the database table definition and alters the table accordingly

var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.dsPsql;

ds.autoupdate(null, function(err) {
  if (err) throw err;
  console.log('Finished autoupdate');
  ds.disconnect();
});

// // this part is from documentation
// ds.createModel(schema_v2.name, schema_v2.properties, schema_v2.options);
// ds.autoupdate(schema_v2.name, function (err, result) {
//   ds.discoverModelProperties('CUSTOMER_TEST', function (err, props) {
//     console.log(props);
//   });
// });
