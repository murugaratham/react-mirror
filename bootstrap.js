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

var baseRequest = request.defaults({
  headers: {'User-Agent': 'react-mirror'}
});

var ssl  = !!program.ssl,
    beta = !!program.beta;

if(beta) {
  requestOpts.url += '/latest';
}

function getPackageUrl(releases) {
  if(beta) {
    var prereleases = releases.filter(function(release) {
      return release.prerelease === true;
    });
    return prerelease.sort(semver.rcompare)[0];
  } else {
    return releases[0];
  }
}

function checkLocalVersion(gitver) {
  return semver.lt(pkg.version, gitver);
}

function fetchZipBall(gitPkg) {
  return new Promise(function (resolve, reject) {
    var zipFile = path.join(__dirname, 'tmp', gitPkg.tag_name+'.zip');
    try {
      var r = baseRequest({ url: gitPkg.zipball_url });
      r.on('error', function (err) {
        return reject(err);
      })
      .on('response', function (res) {
        res.pipe(fs.createWriteStream(zipFile));
      })
      .on('complete', function () {
        extract(zipFile, {dir: './tmp'}, function (err) {
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
  console.log('Error downloading latest update, reasonL ' + err);
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
}

function gitCallback (err, res, body) {
  try {
    if(!err && res.statusCode == 200) {
      var releases = JSON.parse(body);
      var gitPkg = getPackageUrl(releases);
      var requireUpdate = checkLocalVersion(gitPkg.tag_name);
      //if(requireUpdate) {
        try {
          fs.mkdirSync('./tmp');
        } catch (e) {
          if (e.code != 'EEXIST') throw e;
        }
        fetchZipBall(gitPkg).then(updatePackage, fetchZipBallErr);
      //}
        //update local server
        //spawn('npm', ['install']).on('close', function() { });
      //}
    } else {
      console.log('gitcallback err: ' + err);
    }
  } catch (e) {
    console.log(e);
  }
}

//setInterval to check for updates
baseRequest({url: 'https://api.github.com/repos/murugaratham/react-mirror/releases'}, gitCallback);
