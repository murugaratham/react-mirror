var path      = require('path'),
    express   = require('express'),
    program   = require('commander'),
    fs        = require('fs');
    pkg       = require(path.join(__dirname, 'package.json'));

// Parse command line options

program
  .version(pkg.version)
  .option('-p, --port <port>',         'Port on which to listen to (defaults to 8080)', parseInt)
  .option('-S, --ssl',                 'Enable https')
  .option('-C, --cert <path to cert>', 'Path to ssl cert file (default: cert.pem)')
  .option('-K, --key  <path to key>',  'Path to ssl key file (default: key.pem)')
  .parse(process.argv);

var port = program.port || 8080,
    ssl  = !!program.ssl,
    cert = program.cert || path.join(__dirname, 'cert.pem'),
    key  = program.key  || path.join(__dirname, 'key.pem');

var server, opts = {}, app = express();

app.use('/', express.static(__dirname + '/'));

if(ssl) {
  server = require('https');
  opts.cert = fs.readFileSync(cert);
  opts.key = fs.readFileSync(key);
  server.createServer(opts, app).listen(port);
  console.log('ssl enabled');
} else {
  server = require('http');
  server.createServer(app).listen(port);
}


console.log('Running server at port: ' + port);