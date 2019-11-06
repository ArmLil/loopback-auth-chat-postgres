'use strict';

module.exports = function(Worker) {
  console.log('function Worker 4');
  Worker.getIdByAccessToen = function(req, param, cb) {
    console.log('function Worker 6');

    var userId = req.accessToken.userId;
    console.log('function Worker 9');

    console.log({userId});
    cb(null, userId);
  };

  Worker.remoteMethod(
    'getIdByAccessToen',
    {
      accepts: [
        { arg: 'req', type: 'object', http: {source: 'req'} }, // <----
        { arg: 'param', type: 'string', required: true },
      ],
      description: 'Get the worker id matching to the given accessToken.',
      returns: {arg: 'workerId', type: 'number'}
    })
};
