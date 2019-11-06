'use strict';

module.exports = function(Worker) {
  Worker.getIdByAccessToken = function(req, param, cb) {

    var userId = req.accessToken.userId;

    cb(null, userId);
  };

  Worker.remoteMethod(
    'getIdByAccessToken',
    {
      accepts: [
        { arg: 'req', type: 'object', http: {source: 'req'} }, // <----
        { arg: 'param', type: 'string' },
      ],
      description: 'Get the worker id matching to the given accessToken.',
      returns: {arg: 'worker_id', type: 'number'}
    })
};
