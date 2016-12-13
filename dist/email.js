'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiKey = process.env.MAIL_API_KEY; /**
                                        * Created by danielhollcraft on 12/10/16.
                                        */

var domain = process.env.MAIL_DOMAIN;

var mg = (0, _mailgunJs2.default)({ apiKey: apiKey, domain: domain });

function send(_ref) {
  var name = _ref.name,
      email = _ref.email,
      subject = _ref.subject,
      message = _ref.message;


  var data = {
    from: process.env.FROM_EMAIL,
    to: process.env.DEFAULT_TO_EMAIL,
    subject: subject,
    text: message + (' \n \n  Sender e-mail: ' + name + ' <' + email + '>')
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

exports.default = { send: send };