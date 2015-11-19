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
  var zipFile = path.join(__dirname, 'tmp', gitPkg.tag_name+'.zip');
  var r = baseRequest({
    url: gitPkg.zipball_url,
    proxy: getProxyAuth()
  });
  r.on('error', function (err) {
    console.log(err);
  })
  .on('response', function (res) {
    res.pipe(fs.createWriteStream(zipFile));
  })
  .on('complete', function () {
    extract(zipFile, {dir: './tmp'}, function (err) {
      if(err) console.log(err);
    });
  });
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
        fetchZipBall(gitPkg);
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

baseRequest({
  url: 'https://api.github.com/repos/murugaratham/react-mirror/releases'     
}, gitCallback)
