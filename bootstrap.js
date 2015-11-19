var path            = require('path'),
    program         = require('commander'),
    fs              = require('fs'),
    request         = require('request'),
    semver          = require('semver'),
    extract         = require('extract-zip'),
    winston         = require('winston'),
    dailyRotateFile = require('winston-daily-rotate-file');
    cp              = require('child_process'),
    spawn           = cp.spawn,
    exec            = cp.exec,
    pkg             = require(path.join(__dirname, 'package.json'));

program
  .version(pkg.version)  
  .option('-b, --beta', 'Enable prelease (beta)')
  .option('-L, --log <0-5>', '(defaults to 0) <0-5>, error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5', parseInt)
  .option('-s, --silent', 'Disable logging to console')
  .parse(process.argv);

var logLevelMapping = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly'
  ], logTransports  = [],
  logLevel          = logLevelMapping[!!program.log ? program.log : 0],
  isSilent          = !!program.silent || false,
  beta              = !!program.beta,
  defaultHeaders    = {
    headers: {'User-Agent': 'react-mirror'}
  };

console.log(program.log);

if (!isSilent) {
  logTransports.push(new (winston.transports.Console)());
}

logTransports.push(new dailyRotateFile({
  name: 'file',
  filename: path.join(__dirname, 'logs', 'react-logs.logs'),
  datePattern: '.yyyy-MM-dd'
}));

var logger = new winston.Logger({
  level: logLevel,
  transports: logTransports
});

mkdirSync('logs'); //<-- in case there's no log folder

logger.log('silly', 'React bootstrap server initialize with following options -b %s -L %s -s %s', beta, logLevel, isSilent);
logger.log('info', 'Setting request default headers', defaultHeaders);
var baseRequest = request.defaults(defaultHeaders);
logger.log('silly', 'End setting request default headers');

function mkdirSync (path) {
  logger.log('silly', 'Begin creating directory %s', path);
  try {
    fs.mkdirSync(path);
    logger.log('info', 'Directory (%s) successfully created', path);
  } catch(e) {    
    if ( e.code != 'EEXIST' ) {
      logger.log('error', 'Error creating directory (%s), reason: %j', path, e.message);
      throw e;
    } else {
      logger.log('warn', 'Directory (%s) already exists', path);
    }
  }
}

function cherryPickPackage(releases) {
  logger.log('silly', 'Begin cherry picking package');
  if(beta) {
    logger.log('info', 'React bootstrap server is running on beta channel, filtering prerelease package url');
    var prereleases = releases.filter(function(release) {
      return release.prerelease === true;
    });
    logger.log('silly', 'Begin sorting packages and returning latest');
    return prerelease.sort(semver.rcompare)[0];
  } else {
    logger.log('info', 'React bootstrap server is NOT running on beta channel, returning release package url');
    return releases[0];
  }
}

function compareLocalVersion(gitver) {
  logger.log('silly', 'Begin comparing installed version against cherry-picked version');
  logger.log('info', 'Installed version is (%s), cherry-picked version is (%s)', pkg.version, gitver);
  return semver.lt(pkg.version, gitver);
}

function fetchZipBall(gitPkg) {
  logger.log('silly', 'Begin fetching zipball from %s', gitPkg.zipball_url);
  logger.log('debug', 'Returning promise to caller');
  return new Promise(function (resolve, reject) {
    logger.log('silly', 'Begin preparing zipball destination path');
    var zipFilePath = path.join(__dirname, 'tmp', gitPkg.tag_name+'.zip');
    logger.log('silly', 'End preparing zipball destination path');
    logger.log('info', 'Zipball path is %s', zipFilePath);
    try {
      var r = baseRequest({ url: gitPkg.zipball_url });
      r.on('error', function (err) {
        return reject(err);
      })
      .on('response', function (res) {
        res.pipe(fs.createWriteStream(zipFilePath));
      })
      .on('complete', function () {
        extract(zipFilePath, {dir: './tmp'}, function (err) {
          if(err) { 
            return reject (err);
          } else {
            return resolve ();
          }
        });
      });
    } catch (err) { return reject (err); }
  });
}

function fetchZipBallErr(err) {
  console.log('Error downloading latest update, reason: ' + err);
}

function updatePackage() {
  //todo:
  //
  //mkdir tmp/archived-<semver>
  //read .gitignore to skip
  //stop node process
  //move all none ignored files there
  //move latest file from tmp into cwd
  //run npm install, incase we have new dependencies
  //spawn a new node process
  //
  //
  //how do we update bootstrap.js then?
  //mkdirSync('');
}

function gitCallback (err, res, body) {  
  try {
    if(!err && res.statusCode == 200) {
      var releases = JSON.parse(body);
      var gitPkg = cherryPickPackage(releases);
      var requireUpdate = compareLocalVersion(gitPkg.tag_name);
      //if(requireUpdate) {
        mkdirSync('./tmp');
        fetchZipBall(gitPkg).then(updatePackage, fetchZipBallErr);
      //}        
    } else {

    }
  } catch (e) {

  }
}

//setInterval to check for updates
//
baseRequest({url: 'https://api.github.com/repos/murugaratham/react-mirror/releases'}, gitCallback);
