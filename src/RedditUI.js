import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'; // CK: material-ui dependency
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // CK: getting started
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import VisibilitySensor from 'react-visibility-sensor';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionDone from 'material-ui/svg-icons/action/done';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link, NavLink} from 'react-router-dom';

injectTapEventPlugin(); // CK: material-ui dependency

const default_subreddits = ["/r/announcements/","/r/Art/","/r/AskReddit/","/r/askscience/","/r/aww/","/r/blog/","/r/books/","/r/creepy/","/r/dataisbeautiful/","/r/DIY/","/r/Documentaries/","/r/EarthPorn/","/r/explainlikeimfive/","/r/food/","/r/funny/","/r/Futurology/","/r/gadgets/","/r/gaming/","/r/GetMotivated/","/r/gifs/","/r/history/","/r/IAmA/","/r/InternetIsBeautiful/","/r/Jokes/","/r/LifeProTips/","/r/listentothis/","/r/mildlyinteresting/","/r/movies/","/r/Music/","/r/news/","/r/nosleep/","/r/nottheonion/","/r/OldSchoolCool/","/r/personalfinance/","/r/philosophy/","/r/photoshopbattles/","/r/pics/","/r/science/","/r/Showerthoughts/","/r/space/","/r/sports/","/r/television/","/r/tifu/","/r/todayilearned/","/r/UpliftingNews/","/r/videos/","/r/worldnews/","/r/TwoXChromosomes","/r/writingprompts"];

class RedditUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen(e) {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.toggleOpen}
          title={this.props.location.pathname}
          iconElementRight={this.props.isDone && <IconButton><ActionDone/></IconButton>}/>
        <RedditCards data={this.props.data} />
        <Drawer open={this.state.open} docked={false} onRequestChange={open=>this.setState({open})}>
          {default_subreddits.map(item=>(
            <MenuItem key={item}>
              <Link to={item}><div style={{fontWeight: '16px', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>{item}</div></Link>
            </MenuItem>)
          )}
        </Drawer>
      </div>
    )
  }
}

const RedditUIRoot = (props) => {
  return (
    <MuiThemeProvider>
      <RedditUI {...props}/>
    </MuiThemeProvider>
  )
}

const RedditCards = (props) => {
  return (
    <div style={style.cardsDiv} >
      { props.data.map(data=>(<RedditCard key={data.name} data={data} />)) }
    </div>
  )
}

// ref={input=>{console.log(ReactDOM.findDOMNode(input).getBoundingClientRect())}}

const RedditCard = (props) => (
  <Card style={style.cardDiv} >
    <CardHeader
      title={(props.data.over_18) ? `u/${props.data.author} ⚠️`: `u/${props.data.author}` }
      subtitle={`${props.data.subreddit_name_prefixed} | ${props.data.score} points`}
    />

    <CardTitle title={props.data.title} subtitle={<a href={props.data.url}>{props.data.url}</a>} />

    {
      (props.data.url !== undefined) &&
        (<CardMedia
          //{/*overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}*/}
        >
          <Media url={props.data.url} />
        </CardMedia>)
    }

    <CardActions>
      <FlatButton
        style={{color: '#b14f58'}}
        label={`${props.data.num_comments} comments`}
        href={`//www.reddit.com${props.data.permalink}`}/>
      // {/*<FlatButton label="Action2" />*/}
    </CardActions>
  </Card>
);

class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false}
    this.handleVisible = this.handleVisible.bind(this);
    this.handleImgurGifv = handleImgurGifv.bind(this);
  }

  handleVisible(isVisible) {
    if (this.state.isVisible !== isVisible) {
      this.setState({isVisible: isVisible});
    }
  }

  render() {
    const videoUrl = this.handleImgurGifv(this.props.url);
    if (videoUrl) {
      return (
        <div>
          <VisibilitySensor onChange={this.handleVisible}>
            <div><Video isVisible={this.state.isVisible} src={videoUrl} /></div>
          </VisibilitySensor>
        </div>
      )
    } else if (this.props.url.endsWith('.jpg')) {
      return (
        <img src={this.props.url} alt="" />
      )
    } else {
      return null;
    }
  }
}

const Video = (props) => {
  return (
    <video loop controls>
      <source src={props.src} type="video/mp4" />
    </video>
  )
  if (props.isVisible) {
    return (
      <video autoPlay loop controls>
        <source src={props.src} type="video/mp4" />
      </video>
    )
  } else {
    return (
      <video autoPlay loop controls>
        <source src={props.src} type="video/mp4" />
      </video>
    )
  }
}

const handleImgurGifv = (url) => {
  const url2 = new URL(url);
  if (url2.hostname === 'i.imgur.com' && url2.pathname.endsWith('.gifv')) {
    return url2.origin + url2.pathname.split('.')[0] + '.mp4';
  } else {
    return null;
  }
}

const style = {
  cardsDiv: {
    maxWidth: '50em',
    margin: '0 auto'
  }, cardDiv: {
    margin: '2em'
  }, center: {
    margin: '2em auto',
    textAlign: 'center'
  }
}

export default RedditUIRoot;