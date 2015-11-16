
# React Mirror

##<a href="http://murugaratham.github.io/react-mirror" target="_blank">Demo</a>


### Mirror commands
- My name is Gary (or your name)
- Wait (this will pause the news rotation)
- Read for me 

<img src="http://i64.tinypic.com/sy9rb7.jpg" border="0" alt="Image and video hosting by TinyPic" />

This project is inspired by Evan Cohen's [SmartMirror](https://github.com/evancohen/smart-mirror) which in turn was inspired by the respective projects [HomeMirror](https://github.com/HannahMitt/HomeMirror) and Michael Teeuw's [Magic Mirror](http://michaelteeuw.nl/tagged/magicmirror). 
I'm taking this as an opportunity to pick up [ReactJS](https://facebook.github.io/react/), better late than never :)

And also since Evan Cohen's SmartMirror was using [forecast.io](http://forecast.io/), which doesn't support metric units, i decided to hack around and use [openweather](http://www.openweathermap.com/api) instead.

### Quick start (No SSL)
Download and install [node.js](https://nodejs.org/en/)

#### Clone project
```
git clone https://github.com/murugaratham/react-mirror.git
```

#### Get openweather API key (free)
Sign up an account with [openweather](http://home.openweathermap.org/users/sign_in) and take note of the API_KEY and open up `src/Utils/Constants.js` and add in your own key. You can also customise the date and time format, which is done by [moment.js formatting](http://momentjs.com/docs/#/displaying/)

The other constant values are self-explainatory, tweak as you like

```
var Constants = {
  Calendar: {
    Formats: {
      Time: 'h:mm:ss a',
      Date: 'ddd, MMMM D YYYY'
    }
  },
  Weather: {
    ApiKey: `<Insert api key here>`,
    RefreshInterval: 1000 * 60 * 60,
    DefaultLocation: [1.3, 103.8]
  },  
  Feed : {
    Url: 'http://news.yahoo.com/rss/',
    RefreshInterval : 1000 * 60 * 5,
    AppearDuration : 1000 * 5,
    FadeTransitionInterval : {
      Enter: 1000,
      Leave: 400
    }
  }
}

module.exports = Constants;

```

#### Get the mirror running
```
npm install
npm run start-no-ssl
```

### Getting Started (Recommended)

[Why SSL?](https://github.com/TalAter/annyang#annyang-would-like-to-use-your-microphone)

Generate self-signed certs (OSX)
```
openssl genrsa -out localhost-key.pem 1024
openssl req -new -key localhost-key.pem -out localhost.csr

Country Name (2 letter code) [AU]: SG
State or Province Name (full name) [Some-State]: Singapore
Locality Name (eg, city) []: Singapore
Organization Name (eg, company) [Internet Widgits Pty Ltd]: React Mirror 
Organizational Unit Name (eg, section) []: 
Common Name (e.g. server FQDN or YOUR name) []: localhost //<-- must be localhost
Email Address []: react-mirror@github.com

Please enter the following 'extra' attributes to be sent with your certificate request 
A challenge password []: //<-- can leave this blank by pressing enter
An optional company name []:

openssl x509 -req -in localhost.csr -signkey localhost-key.pem -out localhost-cert.pem
```
You should have 3 files `localhost-cert.pem`, `localhost-key.pem` and `localhost.csr`, if you didn't use the values in this README, then update your package.json

```
"start": "npm run build && node node_modules/http-server/bin/http-server -P 
'http://api.openweathermap.org' --ssl -C 'localhost-cert.pem' -K 'localhost-key.pem'",
```
Use your favourite IDE (i'm using [Sublime Text 3](http://www.sublimetext.com/3))

```
npm install   //<-- this run install all the node dependencies
npm run start //<-- npm script which will build and start the server
```

### More info
#### To-do
- ~~Make browserify "watch" source changes whenever i save~~
- ~~Writing a simple server using node (because openweathermap doesn't support https for free accounts and running annyang on http [sucks](https://github.com/TalAter/annyang))~~
- ~~Updating npm run script for people that just want to use http instead of https (caveat: annyang on http is slower and more problematic, if you want a performant smart mirror, please create a self-signed cert or buy a commercial one :)~~
- ~~Fetching RSS feeds (news, stock, etc)~~
- Beautify the screen (I need help here..)
- Using localstorage to "remember" my name
- Add more commands and integration with Annyang
- Customize SpeechSynthesisUtterance to have a nicer voice

#### [http-server](https://github.com/indexzero/http-server) was the ideal package for react-mirror
Firstly, it lived up to it's name of simple, zero-configuration command-line http server. And it also made my life much easier by being able to proxy requests that can't be resolved locally. Thanks [indexzero](https://github.com/indexzero)!

### I need css help!
I need people with a eye for design to make the UI more appealing, it looks boring now

### License
[WTFPL](http://www.wtfpl.net/)
