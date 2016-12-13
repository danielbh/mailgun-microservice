A microservice for handling contact forms using mailgun and restify that could be deployed with your favorite Docker supported deploy method. As a suggestion you could use [Dokku](https://dokku.viewdocs.io/dokku/) or [now.sh](https://now.sh).

This repo requires a [mailgun](http://www.mailgun.com/) account, and it is recommended you get that account verified.

**Environmental variables are found in *src/config.***

They are:

**port**: Server port, if not defined, defaults to 80.

**from**: The from address as it appears on the recipient's e-mail. I found that it's best to keep this as predefined and have the actual sender be in the footer of the e-mail. Otherwise you run the risk of contact e-mails ending up in your spam folder.

**to**: This is where the e-mail is going. I set it as an environmental variable because since this was created for contact forms the e-mail usually goes to the same place.

**apiKey**: Mailgun API key.

**domain**: Mailgun sending domain.


***Dockerfile users node 6.9***