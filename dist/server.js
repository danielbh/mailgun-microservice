'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _restify2.default.createServer({});

// For url query params

// json schema validator
server.use(_restify2.default.queryParser());

server.use(_restify2.default.CORS({
  origins: ['https://makeappsfaster.com, http://localhost'],
  credentials: true
}));

// Start listening for requests
server.listen(process.env.PORT || 8080);

server.post('/contact', function (req, res, next) {

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

  validate(req.params).then(function (valid) {
    _email2.default.send(req.params);
    res.send(200, "Form submit successful");
  }).catch(function (error) {
    if (error) {
      res.send(400, error.errors);
    }
  });

  return next();
});