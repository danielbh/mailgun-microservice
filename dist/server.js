'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import email from './email'
//json schema validator
var server = _restify2.default.createServer({});

// For url query params
server.use(_restify2.default.bodyParser());
server.use(_restify2.default.gzipResponse());

// Start listening for requests
server.listen(_config2.default.port || 8080);

server.post({
  path: '/contact',
  versions: ['1.0.0']
}, function (req, res, next) {

  var ajv = new _ajv2.default();

  var validate = ajv.compile({
    "$async": true,
    "properties": {
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "subject": { "type": "string" },
      "message": { "type": "string" }
    },
    // Prevents additional properties added
    "additionalProperties": false,
    "required": ["name", "email", "subject", "message"]
  });

  validate(JSON.parse(req.body)).then(function (valid) {
    email.send(req.params);
    res.send(200, "Form submit successful");
  }).catch(function (error) {
    if (error) {
      res.send(400, error.errors);
      console.error(error.errors);
    }
  });

  return next();
}); //