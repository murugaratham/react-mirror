var path          = require('path'),
    program       = require('commander'),
    fs            = require('fs'),
    request       = require('request'),
    semver        = require('semver'),
    cp            = require('child_process'),
    extract       = require('extract-zip'),
    spawn         = cp.spawn,
    exec          = cp.exec,
    pkg           = require(path.join(__dirname, 'package.json'));

program.option('-b, --beta', 'Enable prelease (beta)');

var requestOpts = {
      url: 'https://api.github.com/repos/murugaratham/react-mirror/releases',
      headers: {
        'User-Agent': 'react-mirror'
      }
    };

//regular updates
//
var ssl  = !!program.ssl,
    beta = !!program.beta;

if(beta) {
  requestOpts.url += '/latest';
}

function gitCallback (err, res, body) {
  if(!err && res.statusCode == 200) {
    var releases = JSON.parse(body);
    var gitPkg;
    if(beta) {
      var prereleases = releases.filter(function(release) {
        return release.prerelease === true;
      });
      gitPkg = prerelease.sort(semver.rcompare)[0];
    } else {
      gitPkg = releases[0];
    }
    //check updated package version vs local version
    //if(semver.lt(pkg.version, gitPkg.tag_name)) {
      
      try {
        fs.mkdirSync('./tmp');
      } catch (e) {
        if (e.code != 'EEXIST') throw e;
      }
      var zipFile = path.join(__dirname, 'tmp', gitPkg.tag_name+'.zip');

      var options = {
        url: gitPkg.zipball_url,
        headers: {
          'User-Agent': 'request'
        }
      };

      var r = request(options);
      r.on('response', function (res) {
        res.pipe(fs.createWriteStream(zipFile));
      });

      extract(zipFile, {dir: './tmp'}, function (err) {
        if(err) console.log(err);
      });
      //update local server
      //spawn('npm', ['install']).on('close', function() { });
    //}
  }
}

request(requestOpts, gitCallback);