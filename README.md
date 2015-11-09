
# React Mirror

##<a href="http://murugaratham.github.io/react-mirror" target="_blank">Try it out</a>

This project is inspired by Evan Cohen's [SmartMirror](https://github.com/evancohen/smart-mirror) which in turn was inspired by the respective projects [HomeMirror](https://github.com/HannahMitt/HomeMirror) and Michael Teeuw's [Magic Mirror](http://michaelteeuw.nl/tagged/magicmirror). 
I'm taking this as an opportunity to pick up [ReactJS](https://facebook.github.io/react/), better late than never :)

And also since Evan Cohen's SmartMirror was using [forecast.io](http://forecast.io/), which doesn't support metric units, i decided to hack around and use [openweather](http://www.openweathermap.com/api) instead.
## To-do
~~- Make browserify "watch" source changes whenever i save~~
- Using localstorage to "remember" my name
- Beautify the screen
- Add more commands and integration with Annyang
- Customize SpeechSynthesisUtterance to have a nicer voice

### Getting Started
Sign up an account with [openweather](http://home.openweathermap.org/users/sign_in) and take note of the API_KEY

Clone project
```
git clone https://github.com/murugaratham/react-mirror.git
```
Use your favourite IDE, or use [Sublime Text 3](http://www.sublimetext.com/3) 

```
npm install   //<-- this run install all the node dependencies
npm run start //<-- npm script which will build and start the server
```

Once you have a hang of it you can start to play around by running
```
npm run start-dev //<-- npm script which will build & watch for source changes and start the server
```
### More info
##### Why i use node.js?
Because i am lazy to reference other projects manually in `<script>` tags, and it's time for me to use some frontend dependency management tools. Just fill up `package.json` run `npm install` and all your dependencies are loaded, what more can i ask for?
##### Why is there a need for python to host the server then?
Because i only want to use node for the packages, i can and/or i might change it to node, or send me a pull request and i'll gladly accept.
### License
[WTFPL](http://www.wtfpl.net/)
