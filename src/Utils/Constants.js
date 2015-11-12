var Constants = {
  Calendar: {
    Formats: {
      Time: 'h:mm:ss a',
      Date: 'ddd, MMMM D YYYY'
    }
  },
  Weather: {
    ApiKey: '1ee24161cdbde3ee4e90303b6635b317',
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