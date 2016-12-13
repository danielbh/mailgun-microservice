'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by danielhollcraft on 12/10/16.
 */
var mg = (0, _mailgunJs2.default)({ apiKey: _config.apiKey, domain: _config.domain });

function send(_ref) {
  var name = _ref.name,
      email = _ref.email,
      subject = _ref.subject,
      message = _ref.message;


  var data = {
    from: _config.from,
    to: _config.to,
    subject: subject,
    text: message + (' \n \n  Sender e-mail: ' + name + ' <' + email + '>')
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

exports.default = { send: send };