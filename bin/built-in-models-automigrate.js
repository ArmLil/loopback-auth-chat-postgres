'use strict'

//To create tables for only LoopBack built-in models

var server = require('../server/server');
var ds = server.dataSources.dsPsql;
// var lbTables = ['User'];
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];

ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
