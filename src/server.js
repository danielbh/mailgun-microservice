import restify from 'restify'
//import email from './email'
//json schema validator
import AJV from 'ajv'
import config from './config'

const server = restify.createServer({});

// For url query params
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

// Start listening for requests
server.listen(config.port || 8080);

server.post({
  path: '/contact',
  versions: ['1.0.0']
}, (req, res, next) => {

  const ajv = new AJV();

  const validate = ajv.compile({
    "$async": true,
    "properties": {
      "name": {"type":"string"},
      "email": {"type":"string", "format": "email"},
      "subject": {"type":"string"},
      "message": {"type":"string"},
    },
    // Prevents additional properties added
    "additionalProperties": false,
    "required": ["name", "email", "subject", "message"],
  });

  validate(JSON.parse(req.body))
    .then(valid => {
      email.send(req.params);
      res.send(200, "Form submit successful");
    })
    .catch(error => {
      if (error) {
        res.send(400, error.errors);
        console.error(error.errors)
      }
    });

  return next();
});//