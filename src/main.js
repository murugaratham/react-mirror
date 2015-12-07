'use strict';

var React             = require('react'),
    ReactDOM          = require('react-dom'),
    ReactBS           = require('react-bootstrap'),
    $                 = require('jquery'),
    Grid              = ReactBS.Grid,
    Row               = ReactBS.Row,
    Col               = ReactBS.Col,
    Clock             = require('./components/Clock'),
    Calendar          = require('./components/Calendar'),
    Weather           = require('./components/Weather'),
    Feed              = require('./components/rss'),
    Jarvis            = require('./Utils/Jarvis'),
    Constants         = require('./Utils/Constants');

//main app
var SmartMirror = React.createClass({
  displayName: 'SmartMirror',
  getInitialState: function() {
    return { version: '' };
  },
  componentDidMount: function() {
    var self = this;
    Jarvis.init();
    $.get('/version', function(data) {
      if (self.isMounted()) {
        self.setState({
          version: data
        });
      }
    });
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
        <Row>
        <Col xs={12}>
          <div className='label label-default text-right'>
            {this.state.version}
          </div>
        </Col>
        </Row>
      </Grid>
    );
  }
});

ReactDOM.render(<SmartMirror />, document.getElementById('app'));