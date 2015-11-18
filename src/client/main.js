'use strict';

var React             = require('react'),
    ReactDOM          = require('react-dom'),
    ReactBS           = require('react-bootstrap'),
    Grid              = ReactBS.Grid,
    Row               = ReactBS.Row,
    Col               = ReactBS.Col,
    Clock             = require('../components/Clock'),
    Calendar          = require('../components/Calendar'),
    Weather           = require('../components/Weather'),
    Feed              = require('../components/RSS'),
    Jarvis            = require('../Utils/Jarvis'),
    Constants         = require('../Utils/Constants');

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
          <Col xs={8}>
            <Calendar />
            <Clock />
            <Feed pollInterval={Constants.Feed.RefreshInterval} 
                  url={Constants.Feed.Url} />
          </Col>
          <Col xs={4}>
            <Weather pollInterval={Constants.Weather.RefreshInterval}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

ReactDOM.render(<SmartMirror />, document.getElementById('app'));