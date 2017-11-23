import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import dropdown from './DropDownIcon.svg';
import Transition from 'react-transition-group/Transition';
import Comments from '../comments';
import { Route } from 'react-router-dom'

const DEFAULT_SUBREDDITS = ["/r/announcements/","/r/Art/","/r/AskReddit/","/r/askscience/","/r/aww/","/r/blog/","/r/books/","/r/creepy/","/r/dataisbeautiful/","/r/DIY/","/r/Documentaries/","/r/EarthPorn/","/r/explainlikeimfive/","/r/food/","/r/funny/","/r/Futurology/","/r/gadgets/","/r/gaming/","/r/GetMotivated/","/r/gifs/","/r/history/","/r/IAmA/","/r/InternetIsBeautiful/","/r/Jokes/","/r/LifeProTips/","/r/listentothis/","/r/mildlyinteresting/","/r/movies/","/r/Music/","/r/news/","/r/nosleep/","/r/nottheonion/","/r/OldSchoolCool/","/r/personalfinance/","/r/philosophy/","/r/photoshopbattles/","/r/pics/","/r/science/","/r/Showerthoughts/","/r/space/","/r/sports/","/r/television/","/r/tifu/","/r/todayilearned/","/r/UpliftingNews/","/r/videos/","/r/worldnews/"]

const UI = (props) => (
  <div>
    <Header pathname={props.location.pathname} />
    <Dropdown>
      <Subreddits />
    </Dropdown>
    <Posts data={props.data} />
    <NextPage {...props} />
  </div>
);

class Posts extends React.Component {
  render() {
    const { data: posts } = this.props
    return (
      <div style={styles.center}>
        {posts.map((data, i) => (
          <Post data={data} i={i+1} key={data.name} />
        ))}
      </div>
    )
  }
}

class Post extends React.Component {
  render() {
    const { data, i } = this.props
    return (
      <article style={styles.row}>
        <span style={styles.numbering}>{i}</span>
        <div>
          <div>{data.title}</div>
          <Selftext data={data} />
          <MySubtitle data={data} />
        </div>
      </article>
    )
  }
}

const MySubtitle = ({ data }) => (
  <Subtitle data={data} location={location}>

    <SubtitleLink href={data.subreddit} text={data.subreddit_name_prefixed} />
    <SubtitleSeperator />

    <span>{data.author}</span>
    <SubtitleSeperator />

    <span>{`${data.score} points`}</span>
    <SubtitleSeperator />

    <span><a target="_blank" style={styles.link} href={data.url}>link</a></span>

    <SubtitleButton
      style={{ color: '#E53935' }}
      showText="show image"
      hideText="hide image"
      type="image"
      needRender={data.url.endsWith('.jpg') || data.url.endsWith('.png')}
    />

    <SubtitleButton
      style={{ color: '#FFA500' }}
      showText="show gifv"
      hideText="hide gifv"
      type="video"
      needRender={data.url.endsWith('.gifv')}
    />

    <SubtitleButton
      showText={`show ${data.num_comments} comments`}
      hideText="hide comment"
      type="comments"
      needRender={true}
    />
  </Subtitle>
)

class NextPage extends React.Component {
  render() {
    const { data, location } = this.props
    return (
      data.length > 0 &&
        (<Link style={styles.footer} to={`${location.pathname}?count=25&after=${data[data.length - 1].name}`}>next</Link>)
    )
  }
}

class Header extends React.Component {
  state = {
    active: false,
    value: ''
  }

  toggle() {
    this.setState({ active: !this.state.active })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return this.state.active
      ? (<Route render={({ history}) => (
          <form
            style={styles.header}
            onSubmit={(e) => { e.preventDefault(); history.push(`/r/${this.state.value}`); this.toggle(); this.setState({ value: '' }); }} >
          <input
            autoFocus
            onBlur={() => this.setState(previousState => ({ active: !previousState.active }))}
            style={styles.headerInput}
            placeholder="Search subreddit..."
            type="text"
            value={this.state.value}
            onChange={e=>this.handleChange(e)} />
          </form>
        )} />)
      : <h1 onClick={() => this.toggle()} style={styles.header}>{this.props.pathname}</h1>
  }
}

class Dropdown extends React.Component {
  state = { active: false }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: false })
  }

  render() {
    console.log(this.props.onStateChanged)
    const isActive = this.props
    return (
      <div onClick={() => this.setState(previousState => ({ active: !previousState.active }))}>
        <a href={"javascript:void(0);"}>
          <img src={dropdown} style={{textAlign: 'center', height: '0.5em'}}/>
        </a>
        <Transition in={this.state.active}>
          {(state) => (
            <div style={{...defaultStyle, ...transitionStyles[state]}}>
              {console.log(state)}
              {this.props.children}
            </div>
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

const SubtitleSeperator = () => (<span>{" | "}</span>)

class Subtitle extends React.Component {

  state = {
    hideImage: true,
    hideVideo: true,
    hideComments: true
  }

  onImageButtonClick = () => this.setState(previousState => ({ hideImage: !previousState.hideImage }))
  onVideoButtonClick = () => this.setState(previousState => ({ hideVideo: !previousState.hideVideo }))
  onCommentButtonClick = () => this.setState(previousState => ({ hideComments: !previousState.hideComments }))

  render() {
    const { hideImage, hideVideo, hideComments } = this.state
    const { data } = this.props
    // passing all props to children
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        onImageButtonClick: this.onImageButtonClick,
        onVideoButtonClick: this.onVideoButtonClick,
        onCommentButtonClick: this.onCommentButtonClick,
        ...this.state
      })
    })
    return (
      <div style={styles.subtitle}>
        {children}
        <SubtitleImage hide={hideImage} src={data.url}/>
        <SubtitleVideo hide={hideVideo} src={data.url}/>
        <SubtitleComments hide={hideComments} src={data.permalink}/>
      </div>
    )
  }

}

class SubtitleLink extends React.Component {
  render() {
    const { href, text } = this.props
    return <span><Link style={styles.link} to={href}>{text}</Link></span>
  }
}

class SubtitleButton extends React.Component {
  render() {
    const style = Object.assign({}, styles.link, this.props.style)
    const { type, needRender, showText, hideText } = this.props

    const hide = (type === 'image')
      ? this.props.hideImage
      : (type === 'video')
        ? this.props.hideVideo
        : this.props.hideComments

    const onClick = (type === 'image')
      ? this.props.onImageButtonClick
      : (type === 'video')
        ? this.props.onVideoButtonClick
        : this.props.onCommentButtonClick

    return needRender
      ? (
        <span>
          <SubtitleSeperator />
          <a style={style} href="javascript:void(0);" onClick={() => onClick()}>
            {hide ? showText : hideText}
          </a>
        </span>
      )
      : null
  }
}

class SubtitleImage extends React.Component {
  render() {
    const { hide, src } = this.props
    return hide ? null : (<img src={src}/>)
  }
}

class SubtitleVideo extends React.Component {
  render() {
    const { hide, src } = this.props
    return hide ? null : <video autoPlay hideControls loop src={src.slice(0, -5) + '.mp4'} />
  }
}

class SubtitleComments extends React.Component {
  render() {
    const { hide, src } = this.props
    return hide ? null : <Comments location={{ pathname: src }} />
  }
}

// class Toggle extends React.Component {
//   state = {active: false};

//   toggle() {
//     this.setState({active: !this.state.active});
//   }

//   render() {
//     const { onChange } = this.props
//     const style = Object.assign({}, styles.link, this.props.style)
//     if (this.props.renderCondition) {
//       return(
//         <span>
//           <SubtitleSeperator />
//           <a style={style} href="javascript:void(0);" onClick={() => {this.toggle(); onChange()}}>{this.state.active ? this.props.hideText : this.props.showText}</a>
//           {this.state.active && this.props.children}
//         </span>
//       )
//     } else {
//       return null
//     }
//   }
// }

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