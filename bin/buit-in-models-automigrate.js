'use strict'

//To create tables for only LoopBack built-in models


var server = require('../server/server');
var ds = server.dataSources.dsPsql;
// var lbTables = ['User'];
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
