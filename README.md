# My Application

The project is generated by [LoopBack](http://loopback.io).

To create tables for LoopBack remote models, follow this procedure:
$ cd bin
$ node remote-models-automigrate.js
this will delete previously created tables and create new tables


To create tables only for LoopBack built-in models, follow this procedure:
 $ cd bin
 $ node buit-in-models-automigrate.js


To enable authentication
comment the row with "server.enableAuth();" in server/boot/authentication.js

To discover tables(already created in db) at runtime and create API for them
uncomment and run server/boot/discover-models.js then comment again
$ cd server/boot
$ node discover-models.js

to login
post /Users/login
admin
{
 "username": "Lilit",
 "password": "123456"
}
or
{
  "email": "jane@doe.com",
  "password": "opensesame"
}

example of responce body
{
  "id": "xbInJhcvOIlEtW8sQYl6fyFfHjzyEDgcuRq4tQNzreNrMW6CytYFm6wiNKyfBijP",
  "ttl": 1209600,
  "created": "2019-10-29T07:42:39.461Z",
  "userId": 3
}
"xbInJhcvOIlEtW8sQYl6fyFfHjzyEDgcuRq4tQNzreNrMW6CytYFm6wiNKyfBijP" is AccessToken


To change authentication permissions for model user
update user-acls.json


To attache any model to the authentication run in shell the following command then follow the instructions
$ lb acl
1. select the model: - model_name
2. select the access type: - All
3. select the role: - Any unauthenticated user
4. select the permission to apply: - Explicitly deny access