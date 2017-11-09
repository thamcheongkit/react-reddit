import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import dropdown from './dropdown.svg';
import Transition from 'react-transition-group/Transition';
import Comments from '../comments';
import { Route } from 'react-router-dom'


// import styles from './ui.css';
const DEFAULT_SUBREDDITS = ["/r/announcements/","/r/Art/","/r/AskReddit/","/r/askscience/","/r/aww/","/r/blog/","/r/books/","/r/creepy/","/r/dataisbeautiful/","/r/DIY/","/r/Documentaries/","/r/EarthPorn/","/r/explainlikeimfive/","/r/food/","/r/funny/","/r/Futurology/","/r/gadgets/","/r/gaming/","/r/GetMotivated/","/r/gifs/","/r/history/","/r/IAmA/","/r/InternetIsBeautiful/","/r/Jokes/","/r/LifeProTips/","/r/listentothis/","/r/mildlyinteresting/","/r/movies/","/r/Music/","/r/news/","/r/nosleep/","/r/nottheonion/","/r/OldSchoolCool/","/r/personalfinance/","/r/philosophy/","/r/photoshopbattles/","/r/pics/","/r/science/","/r/Showerthoughts/","/r/space/","/r/sports/","/r/television/","/r/tifu/","/r/todayilearned/","/r/UpliftingNews/","/r/videos/","/r/worldnews/"]

const UI = (props) => (
  <div style={props.style}>
    <Header pathname={props.location.pathname} />
    {/* <h1 style={styles.header}>{props.location.pathname}</h1> */}
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
        <Link style={styles.footer} to={ `${props.location.pathname}?count=25&after=${props.data[props.data.length-1].name}` }>next</Link>
      }
    </div>
  </div>
);

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      activa: false,
      value: ''
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props)
  }

  toggle() {
    this.setState({active: !this.state.active})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return this.state.active
      ? (<Route render={({ history}) => (
          <form style={styles.header} onSubmit={(e)=>{e.preventDefault(); this.toggle(); this.setState({value: ''}); history.push(`/r/${this.state.value}`)}} >
            <input autoFocus style={styles.headerInput} placeholder="Search subreddit..." type="text" value={this.state.value} onChange={this.handleChange} />
          </form>
        )} />)
      : <h1 onClick={this.toggle} style={styles.header}>{this.props.pathname}</h1>
  }
}

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
    {DEFAULT_SUBREDDITS.map(subreddit=>(<li key={subreddit}><Link to={subreddit}>{subreddit}</Link></li>))}
  </ul>
)

const Selftext = ({data}) => {
  if (data.selftext) {
    return (<div className="selftext" style={styles.selftext}><div>{data.selftext}</div></div>)
  } else {
    return null
  }
}

// const Selftext2 = ({data}) => {
//   if (data.selftext) {
//     return (<div style={styles.selftext} dangerouslySetInnerHTML={{__html: markdown.toHTML(data.selftext)}}></div>)
//   } else {
//     return null
//   }
// }

const Subtitle = ({data}) => (
  <div style={styles.subtitle}>
    <span><Link style={styles.link} to={data.subreddit}>{data.subreddit_name_prefixed}</Link></span>
    {/* <span>{` | ${data.num_comments} comments`}</span> */}
    <span> | <a style={styles.link} href={data.permalink}>{`${data.num_comments} comments`}</a></span>
    <span>{` | ${data.score} point`}</span>
    <span>{` | ${data.author}`}</span>
    <Toggle
        style={{...styles.link, color: '#E53935'}}
        url={data.url}
        hideText={'hide image'}
        showText={'show image'}
        renderCondition={data.url.endsWith('.jpg') || data.url.endsWith('.png')}>
      <img src={data.url} alt="" />
    </Toggle>
    <Toggle
        style={{...styles.link, color: '#E53935'}}
        url={data.url}
        hideText={'hide gifv'}
        showText={'show gifv'}
        renderCondition={data.url.endsWith('.gifv')}>
      <video autoPlay hideControls loop src={data.url.slice(0,-5)+'.mp4'} />
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

const duration = 1000;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 1,
  maxHeight: '0px',
  visibility: 'hidden'
}

const transitionStyles = {
  exited: { opacity: 0, maxHeight: '0px', visibility: 'hidden' },
  exiting: { opacity: 0, maxHeight: '0px', visibility: 'hidden' },
  entering: { opacity: 1, maxHeight: '2000px', visibility: 'visible' },
  // entered:  { opacity: 1, maxHeight: '1000px', visibility: 'visible' },
};

const styles = {
  header: {
    textAlign: 'center',
    marginTop: '0.67em',
    marginBottom: '0.67em'
  },
  headerInput: {
    fontSize: '2em',
    textAlign: 'center',
    fontWeight: 'bold',
    border: 'none'
  },
  footer: {
    textAlign: 'center',
    marginBottom: '1em'
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
  selftext: {
    color: '#666',
    fontSize: '0.75em',
    wordBreak: 'break-word',
    maxHeight: '10em',
    overflow: 'scroll',
  },
  subtitle: {
    color: '#666',
    fontSize: '0.75em',
    wordBreak: 'break-word'
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