
# React Mirror

##<a href="http://murugaratham.github.io/react-mirror" target="_blank">Demo</a>

This project is inspired by Evan Cohen's [SmartMirror](https://github.com/evancohen/smart-mirror) which in turn was inspired by the respective projects [HomeMirror](https://github.com/HannahMitt/HomeMirror) and Michael Teeuw's [Magic Mirror](http://michaelteeuw.nl/tagged/magicmirror). 
I'm taking this as an opportunity to pick up [ReactJS](https://facebook.github.io/react/), better late than never :)

And also since Evan Cohen's SmartMirror was using [forecast.io](http://forecast.io/), which doesn't support metric units, i decided to hack around and use [openweather](http://www.openweathermap.com/api) instead.
## To-do
- ~~Make browserify "watch" source changes whenever i save~~
- ~~Writing a simple server using node (because openweathermap doesn't support https for free accounts and running annyang on http [sucks](https://github.com/TalAter/annyang))~~
- Using localstorage to "remember" my name
- Beautify the screen
- Add more commands and integration with Annyang
- Customize SpeechSynthesisUtterance to have a nicer voice

### Getting Started
Download and install [node.js](https://nodejs.org/en/)

Clone project
```
git clone https://github.com/murugaratham/react-mirror.git
```

Sign up an account with [openweather](http://home.openweathermap.org/users/sign_in) and take note of the API_KEY and open up `src/config.js` and add in your own key

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
##### ~~Why i use node.js?~~
~~Because i am lazy to reference other projects manually in `<script>` tags, and it's time for me to use some frontend dependency management tools. Just fill up `package.json` run `npm install` and all your dependencies are loaded, what more can i ask for?~~
##### ~~Why is there a need for python to host the server then?~~
~~Because i only want to use node for the packages, i can and/or i might change it to node, or send me a pull request and i'll gladly accept.~~
##### [http-server](https://github.com/indexzero/http-server) was the ideal package for react-mirror
Firstly, it lived up to it's name of simple, zero-configuration command-line http server. And it also made my life much easier by being able to proxy requests that can't be resolved locally. Thanks [indexzero](https://github.com/indexzero)!
### License
[WTFPL](http://www.wtfpl.net/)
