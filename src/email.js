/**
 * Created by danielhollcraft on 12/10/16.
 */
import mailgun from 'mailgun-js'

import {apiKey, domain, from , to} from './config'

const mg = mailgun({apiKey, domain});

function send({name, email, subject, message}) {

  const data = {
    from,
    to,
    subject,
    text: message + ` \n \n  Sender e-mail: ${name} <${email}>`
  };

  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
}

export default { send }
