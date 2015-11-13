'use strict';

var React                     = require('react'),
    GetFeed                   = require('../Utils/FetchRss'),
    $                         = require('jquery'),
    ReactCSSTransitionReplace = require('react-css-transition-replace'),
    SetIntervalMixin          = require('../Utils/mixin/SetIntervalMixin'),
    Constants                 = require('../Utils/Constants'),
    moment                    = require('moment'),
    ReactBS                   = require('react-bootstrap'),
    ButtonToolbar             = ReactBS.ButtonToolbar,
    Button                    = ReactBS.Button,
    Modal                     = ReactBS.Modal;

var Feed = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return { 
      feed: { 
        entries: [] 
      },
      currentFeed: 0,
      showDialog: false
    };
  },
  initFeedInterval: function () {
    this.feedInterval = setInterval(this.showNextFeed, Constants.Feed.AppearDuration);
  },
  componentDidMount: function () {
    this.loadFeedFromServer();    
    setInterval(this.loadFeedFromServer, this.props.pollInterval);
    this.initFeedInterval();
  },
  showNextFeed: function () {
    var feedCount = this.state.feed.entries.length - 1;
    var currentFeed = this.state.currentFeed;
    if(currentFeed < feedCount) {
      currentFeed++;
    } else {
      currentFeed = 0 //reset
    }   
    if (this.isMounted()) {
      this.setState({ currentFeed: currentFeed });
    } 
  },
  loadFeedFromServer: function () {
    GetFeed(this.props.url, function (err, feed) {
      if (this.isMounted()) {
        this.setState({ feed: feed });
      }
    }.bind(this));
  },
  handleClick: function () {
    //clearInterval(this.feedInterval);
    //this.initFeedInterval();
    if(this.isMounted()) {
      this.setState({ showDialog: !this.state.showDialog });
    }
  },
  render: function () {
    var haveFeed = this.state.feed.entries.length !== 0;
    var entry = this.state.feed.entries[this.state.currentFeed]; 
    var feed;
    if (haveFeed) {
      return (
        <div className="newsticker" onClick={this.handleClick}>
          <FeedItemDialog />
          <ReactCSSTransitionReplace transitionName="fade-wait" 
                                     overflowHidden={false}
                                     transitionEnterTimeout={Constants.Feed.FadeTransitionInterval.Enter} 
                                     transitionLeaveTimeout={Constants.Feed.FadeTransitionInterval.Leave}>
            <FeedItem key={this.state.currentFeed} entry={entry} />
          </ReactCSSTransitionReplace>
        </div>
      );
    } else {
      return <div/>
    }
  }
});

var FeedItem = React.createClass({
  rawHtml: function () { 
    return { __html: this.props.entry.content }
  },
  getTimeago: function () {
    return moment.unix(this.props.entry.publishedDate_timestamp).fromNow();
  },
  render: function () {
    return (
      <div data-link={this.props.entry.link}>
        <h3>{this.props.entry.title}</h3>
        <div>{this.props.entry.contentSnippet} </div>
        <div>{this.getTimeago()}</div>
      </div>
    );
  }
});

var FeedItemDialog = React.createClass({
  getInitialState: function () {
    return { show: false }
  },
  showModal: function () {
    if (this.isMounted()) {
      this.setState({ show: true });
    }
  },
  hideModal: function () {
    if (this.isMounted()) {
      this.setState({ show: false });
    }
  },
  render: function () {
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModal}>
          Launch demo modal
        </Button>
        <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
            <p>Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam atque a dolores quisquam quisquam adipisci possimus laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
             Mollitia reiciendis porro quo magni incidunt dolore amet atque facilis ipsum deleniti rem! Dolores debitis voluptatibus ipsum dicta. Dolor quod amet ab sint esse distinctio tenetur. Veritatis laudantium quibusdam quidem corporis architecto veritatis. Ex facilis minima beatae sunt perspiciatis placeat. Quasi corporis
             odio eaque voluptatibus ratione magnam nulla? Amet cum maiores consequuntur totam dicta! Inventore adipisicing vel vero odio modi doloremque? Vitae porro impedit ea minima laboriosam quisquam neque. Perspiciatis omnis obcaecati consequatur sunt deleniti similique facilis sequi. Ipsum harum vitae modi reiciendis officiis.
             Quas laudantium laudantium modi corporis nihil provident consectetur omnis, natus nulla distinctio illum corporis. Sit ex earum odio ratione consequatur odit minus laborum? Eos? Sit ipsum illum architecto aspernatur perspiciatis error fuga illum, tempora harum earum, a dolores. Animi facilis inventore harum dolore accusamus
             fuga provident molestiae eum! Odit dicta error dolorem sunt reprehenderit. Sit similique iure quae obcaecati harum. Eum saepe fugit magnam dicta aliquam? Sapiente possimus aliquam fugiat officia culpa sint! Beatae voluptates voluptatem excepturi molestiae alias in tenetur beatae placeat architecto. Sit possimus rerum
             fugiat sapiente aspernatur. Necessitatibus tempora animi dicta perspiciatis tempora a velit in! Doloribus perspiciatis doloribus suscipit nam earum. Deleniti veritatis eaque totam assumenda fuga sapiente! Id recusandae. Consectetur necessitatibus eaque velit nobis aliquid? Fugit illum qui suscipit aspernatur alias ipsum
             repudiandae! Quia omnis quisquam dignissimos a mollitia. Suscipit aspernatur eum maiores repellendus ipsum doloribus alias voluptatum consequatur. Consectetur quibusdam veniam quas tenetur necessitatibus repudiandae? Rem optio vel alias neque optio sapiente quidem similique reiciendis tempore. Illum accusamus officia
             cum enim minima eligendi consectetur nemo veritatis nam nisi! Adipisicing nobis perspiciatis dolorum adipisci soluta architecto doloremque voluptatibus omnis debitis quas repellendus. Consequuntur assumenda illum commodi mollitia asperiores? Quis aspernatur consequatur modi veritatis aliquid at? Atque vel iure quos.
             Amet provident voluptatem amet aliquam deserunt sint, elit dolorem ipsa, voluptas? Quos esse facilis neque nihil sequi non? Voluptates rem ab quae dicta culpa dolorum sed atque molestias debitis omnis! Sit sint repellendus deleniti officiis distinctio. Impedit vel quos harum doloribus corporis. Laborum ullam nemo quaerat
             reiciendis recusandae minima dicta molestias rerum. Voluptas et ut omnis est ipsum accusamus harum. Amet exercitationem quasi velit inventore neque doloremque! Consequatur neque dolorem vel impedit sunt voluptate. Amet quo amet magni exercitationem libero recusandae possimus pariatur. Cumque eum blanditiis vel vitae
             distinctio! Tempora! Consectetur sit eligendi neque sunt soluta laudantium natus qui aperiam quisquam consectetur consequatur sit sint a unde et. At voluptas ut officiis esse totam quasi dolorem! Hic deserunt doloribus repudiandae! Lorem quod ab nostrum asperiores aliquam ab id consequatur, expedita? Tempora quaerat
             ex ea temporibus in tempore voluptates cumque. Quidem nam dolor reiciendis qui dolor assumenda ipsam veritatis quasi. Esse! Sit consectetur hic et sunt iste! Accusantium atque elit voluptate asperiores corrupti temporibus mollitia! Placeat soluta odio ad blanditiis nisi. Eius reiciendis id quos dolorum eaque suscipit
             magni delectus maxime. Sit odit provident vel magnam quod. Possimus eligendi non corrupti tenetur culpa accusantium quod quis. Voluptatum quaerat animi dolore maiores molestias voluptate? Necessitatibus illo omnis laborum hic enim minima! Similique. Dolor voluptatum reprehenderit nihil adipisci aperiam voluptatem soluta
             magnam accusamus iste incidunt tempore consequatur illo illo odit. Asperiores nesciunt iusto nemo animi ratione. Sunt odit similique doloribus temporibus reiciendis! Ullam. Dolor dolores veniam animi sequi dolores molestias voluptatem iure velit. Elit dolore quaerat incidunt enim aut distinctio. Ratione molestiae laboriosam
             similique laboriosam eum et nemo expedita. Consequuntur perspiciatis cumque dolorem.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    )
  }
});

module.exports = Feed;