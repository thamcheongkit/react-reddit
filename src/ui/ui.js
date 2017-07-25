import React from 'react';
import {Link, NavLink} from 'react-router-dom';

// import styles from './ui.css';

const UI = (props) => (
  <div>
    <h1 style={styles.header}>{props.location.pathname}</h1>
    <div style={styles.center} >
      {props.data.map(
        (data, i)=>(
          <article style={styles.row} key={data.name}>
            <span style={styles.numbering}>{i+1}</span>
            <div>
              <div>{data.title}</div>
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

const Subtitle = ({data}) => (
  <div style={styles.subtitle}>
    <span><Link style={styles.link} to={data.subreddit}>{data.subreddit_name_prefixed}</Link></span>
    {/* <span>{` | ${data.num_comments} comments`}</span> */}
    <span> | <a style={styles.link} href={data.permalink}>{`${data.num_comments} comments`}</a></span>
    <span>{` | ${data.score} point`}</span>
     <Toggle style={styles.link} url={data.url}/> 
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
    if (this.props.url.endsWith('.jpg')) {
      return(
        <span>
          <span> | </span>
          <a style={this.props.style} href="javascript:void(0);" onClick={this.toggle}>{this.state.active ? 'hide image' : 'show image'}</a>
          {this.state.active && <img src={this.props.url} alt="" />}
        </span>
      )
    } else {
      return null
    }
  }
}

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