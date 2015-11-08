
# React Mirror
This project is inspired by Evan Cohen's [SmartMirror](https://github.com/evancohen/smart-mirror) which in turn was inspired by the respective projects [HomeMirror](https://github.com/HannahMitt/HomeMirror) and Michael Teeuw's [Magic Mirror](http://michaelteeuw.nl/tagged/magicmirror). 
I'm taking this as an opportunity to pick up [ReactJS](https://facebook.github.io/react/), better late than never :)

And also since Evan Cohen's SmartMirror was using [forecast.io](http://forecast.io/), which doesn't support metric units, i decided to hack around and use [openweather](http://www.openweathermap.com/api) instead.
## To-do
- Make browserify "watch" source changes whenever i save
- Using localstorage to "remember" my name
- Beautify the screen
- Add more commands and integration with Annyang
- Customize SpeechSynthesisUtterance to have a nicer voice


### Getting Started
Use your favourite IDE, or use [Sublime Text 3](http://www.sublimetext.com/3) like i do and install the following packages globally
* babel-cli
* browserify

Install Node.js, run `npm install` to download the dependencies, then start the server.
```
npm install
browserify -t [ babelify --presets [ react ] ] src/main.js -o src/bundle.js
python server.py
```
### More info
##### Why i use node.js?
Because i am lazy to reference other projects manually in `<script>` tags, and it's time for me to use some frontend dependency management tools. Just fill up `package.json` run `npm install` and all your dependencies are loaded, what more can i ask for?
##### Why is there a need for python to host the server then?
Because i only want to use node for the packages, i can and/or i might change it to node, or send me a pull request and i'll gladly accept.
### License
[WTFPL](http://www.wtfpl.net/)
