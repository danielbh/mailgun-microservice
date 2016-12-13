/**
 * Created by danielhollcraft on 12/10/16.
 */
import mailgun from 'mailgun-js'

const apiKey = process.env.MAIL_API_KEY;
const domain = process.env.MAIL_DOMAIN;

const mg = mailgun({apiKey, domain});


function send({name, email, subject, message}) {

  const data = {
    from: process.env.FROM_EMAIL,
    to: process.env.DEFAULT_TO_EMAIL,
    subject,
    text: message + ` \n \n  Sender e-mail: ${name} <${email}>`
  };

  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
}

export default { send }
