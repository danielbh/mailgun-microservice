"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by danielhollcraft on 12/13/16.
 */

exports.default = {
  port: process.env.PORT,
  from: process.env.FROM_EMAIL,
  to: process.env.DEFAULT_TO_EMAIL,
  apiKey: process.env.MAIL_API_KEY,
  domain: process.env.MAIL_DOMAIN
};