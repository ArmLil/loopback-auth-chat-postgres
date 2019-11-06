'use strict';

var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'))

module.exports = function(Article) {
    // remote method before hook
    // will add the worker_id of the registered user to the req.body
    // in create/post /articles method
  Article.beforeRemote('create', function(ctx, modelInstance, next) {
    // console.log('ctx.args.options');
    ctx.args.data.worker_id = ctx.args.options.accessToken.userId
    next();
  });

};
