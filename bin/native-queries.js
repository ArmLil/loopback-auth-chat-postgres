'use strict'

var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.dsPsql;


const sql_stmt =
`ALTER TABLE article
 ADD CONSTRAINT fkey_article_in_worker FOREIGN KEY (worker_id)
    REFERENCES worker (id)
    ON UPDATE CASCADE ON DELETE CASCADE;`

    
ds.connector.query(sql_stmt, null, function(error) {
  if (error) throw error;
  console.log('native query ' + sql_stmt + ' is implemented')
});
