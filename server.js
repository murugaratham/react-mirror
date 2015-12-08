var path      = require('path'),
    express   = require('express'),
    program   = require('commander'),
    fs        = require('fs'),
    pkg       = require(path.join(__dirname, 'package.json'));

// Parse command line options

program
  .version(pkg.version)
  .option('-p, --port <port>',         'Port on which to listen to (defaults to 8080)', parseInt)
  .option('-S, --ssl',                 'Enable https (defaults to port 8443)')
  .option('-C, --cert <path to cert>', 'Path to ssl cert file (default: cert.pem)')
  .option('-K, --key  <path to key>',  'Path to ssl key file (default: key.pem)')
  .parse(process.argv);

var ssl  = !!program.ssl,
    port = program.port || ssl ? 8443 : 8080,
    cert = program.cert || path.join(__dirname, 'cert.pem'),
    key  = program.key  || path.join(__dirname, 'key.pem');

var server, opts = {}, app = express();

if(ssl) {
  var https = require('https');
  opts.cert = fs.readFileSync(cert);
  opts.key = fs.readFileSync(key);
  //server.createServer(opts, app).listen(port);
  server = https.createServer(opts, app).listen(port);
  
  console.log('ssl enabled');
} else {
  server = app.listen(port);
}

var io = require('socket.io').listen(server);

app.use('/static', express.static(__dirname + '/static'));
app.use('/font', express.static(__dirname + '/font'));
app.use('/images', express.static(__dirname + '/images'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('test');
});

app.get('/version', function (req, res){
  res.json(pkg.version);
});

console.log('Running server at port: ' + port);