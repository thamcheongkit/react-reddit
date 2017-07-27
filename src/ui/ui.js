import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import dropdown from './dropdown.svg';
import Transition from 'react-transition-group/Transition';
import Comments from '../comments';

// import styles from './ui.css';
const DEFAULT_SUBREDDITS = ["r/popular","r/AskReddit","r/gameofthrones","r/The_Donald","r/politics","r/nba","r/pics","r/funny","r/videos","r/soccer","r/movies","r/worldnews","r/gifs","r/todayilearned","r/aww","r/gaming","r/asoiaf","r/news","r/BlackPeopleTwitter","r/SquaredCircle","r/GlobalOffensive","r/IAmA","r/Showerthoughts","r/marvelstudios","r/leagueoflegends","r/mildlyinteresting"];

const UI = (props) => (
  <div>
    <h1 style={styles.header}>{props.location.pathname}</h1>
    <Dropdown>
      <Subreddits />
    </Dropdown>
    <div style={styles.center} >
      {props.data.map(
        (data, i)=>(
          <article style={styles.row} key={data.name}>
            <span style={styles.numbering}>{i+1}</span>
            <div>
              <div>{data.title}</div>
              <Selftext data={data} />
              <Subtitle data={data} />
            </div>
          </article>
        )
      )}
      {props.data.length>0 && 
        <Link style={styles.header} to={ `${props.location.pathname}?count=25&after=${props.data[props.data.length-1].name}` }>next</Link>
      }
    </div>
  </div>
);

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {active: false}
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({active: !this.state.active})
  }

  render() {
    return (
      <div onClick={this.toggle}>
        <a href={"javascript:void(0);"}>
          <img src={dropdown} style={{textAlign: 'center', height: '0.5em'}}/>
        </a>
        <Transition in={this.state.active}>
          {(state) => (
            <div style={{...defaultStyle, ...transitionStyles[state]}}>{console.log(state)}{this.props.children}</div>
          )}
        </Transition>
      </div>
    )
  }
}

const Subreddits = () => (
  <ul style={{listStyle: 'none', ...styles.header, padding: '0'}}>
    {DEFAULT_SUBREDDITS.map(subreddit=>(<li key={subreddit}><Link to={'/'+subreddit}>{subreddit}</Link></li>))}
  </ul>
)

const Selftext = ({data}) => {
  if (data.selftext) {
    return (<div style={styles.subtitle}>{data.selftext}</div>)
  } else {
    return null
  }
}

const Subtitle = ({data}) => (
  <div style={styles.subtitle}>
    <span><Link style={styles.link} to={data.subreddit}>{data.subreddit_name_prefixed}</Link></span>
    {/* <span>{` | ${data.num_comments} comments`}</span> */}
    <span> | <a style={styles.link} href={data.permalink}>{`${data.num_comments} comments`}</a></span>
    <span>{` | ${data.score} point`}</span>
    <Toggle
        style={{...styles.link, color: '#E53935'}}
        url={data.url}
        hideText={'hide image'}
        showText={'show image'}
        renderCondition={data.url.endsWith('.jpg')}>
      <img src={data.url} alt="" />
    </Toggle>
    <span> | <a style={styles.link} href={data.url} target="_blank">link</a></span>
    <Toggle
        style={styles.link}
        hideText={'hide comments'}
        showText={'show comments'}
        renderCondition={true}>
      <Comments location={{pathname: data.permalink}} />
    </Toggle>
  </div>
)

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({active: !this.state.active});
  }

  render() {
    if (this.props.renderCondition) {
      return(
        <span>
          <span> | </span>
          <a style={this.props.style} href="javascript:void(0);" onClick={this.toggle}>{this.state.active ? this.props.hideText : this.props.showText}</a>
          {this.state.active && this.props.children}
        </span>
      )
    } else {
      return null
    }
  }
}

const duration = 2000;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 1,
  maxHeight: '0px',
  visibility: 'hidden'
}

const transitionStyles = {
  exited: { opacity: 0, maxHeight: '0px', visibility: 'hidden' },
  exiting: { opacity: 0, maxHeight: '0px', visibility: 'hidden' },
  entering: { opacity: 1, maxHeight: '800px', visibility: 'visible' },
  // entered:  { opacity: 1, maxHeight: '1000px', visibility: 'visible' },
};

const styles = {
  header: {
    textAlign: 'center'
  },
  center: {
    margin: 'auto',
    maxWidth: '50em'
  },
  row: {
    display: 'flex',
    margin: '1em'
  },
  numbering: {
    fontSize: '1.5em',
    marginRight: '1em',
    textAlign: 'right',
    minWidth: '2ex'
  },
  content: {
    display: 'inline'
  },
  subtitle: {
    color: '#666',
    fontSize: '0.75em'
  },
  link: {
    color: '#666',
    display: 'inline'
  },
  button: {
    border: '1px solid',
    borderRadius: 0,
    background: 'none',
  }
}

export default UI;