
//To create tables for LoopBack remote models including built-in models and initialise users and roles

var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.dsPsql;
// ds.automigrate();  run only this  without the next rows to create empty models in db
ds.automigrate(null, function(err) {
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var models = app.models();

    models.forEach(function (Model) {
      console.log(Model.modelName);
    });

    User.create([
      {username: 'John', email: 'john@doe.com', password: 'opensesame'},
      {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
      {username: 'Lilit', email: 'armlilhov@mail.ru', password: '123456'}
    ], function(err, users) {
      if (err) throw err;

      console.log('Created users:', users);
      // create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) throw err;

        console.log('Created role:', role);

        //make Lilit an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[2].id
        }, function(err, principal) {
          if (err) throw err;

          console.log('Created principal:', principal);
        });
      });
    });
  }
);
