'use strict';

var React             = require('react'),
    ReactDOM          = require('react-dom'),
    moment            = require('moment'),
    ReactBS           = require('react-bootstrap'),
    Grid              = ReactBS.Grid,
    Row               = ReactBS.Row,
    Col               = ReactBS.Col,
    Clock             = require('./components/Clock'),
    Calendar          = require('./components/Calendar'),
    Weather           = require('./components/Weather'),
    Feed              = require('./components/RSS'),
    Jarvis            = require('./Utils/Jarvis'),
    Constants         = require('./Utils/Constants');

//main app
var SmartMirror = React.createClass({
  displayName: 'SmartMirror',
  componentDidMount: function() {
    Jarvis.init();
  },
  render: function() {
    return (
      <Grid>
        <Row>
          <Col xs={9}>
            <Calendar />
            <Clock />
            <Feed url={Constants.Feed.Url} pollInterval={Constants.Feed.RefreshInterval} />
          </Col>
          <Col xs={3}>
            <Weather pollInterval={Constants.Weather.RefreshInterval}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

ReactDOM.render(<SmartMirror />, document.getElementById('app'));