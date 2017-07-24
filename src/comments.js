import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import RedditAPI from './reddit_api';
// import RedditUIRoot from './RedditUI';

let {cache} = require('./cache');

// var cache = require('memory-cache');

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pathname: this.props.location.pathname,
      search: this.props.location.search
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    console.log('first mounted!');
    RedditAPI.fetchRedditCommentsJson(data=>{
      cache.set(this.props.location.pathname, data);
      this.setState({data: data, isDone: true});
    }, this.props.location.pathname, this.props.location.search);
  }

  componentWillUpdate(nextProps) {
    if (this.state.pathname !== nextProps.location.pathname || this.state.search !== nextProps.location.search) {

      this.setState({
        pathname: nextProps.location.pathname,
        search: nextProps.location.search,
      });

      // set data from cache
      console.log('cache', cache.get(nextProps.location.pathname));

      cache.get(nextProps.location.pathname, (e,d)=>{
        if (!e && d) {
          this.setState({
            data: cache.get(this.props.location.pathname),
          });
          console.log('use data from cache');
        }

        RedditAPI.fetchRedditCommentsJson(data=>{
          cache.set(nextProps.location.pathname, data);
          this.setState({
            data: data,
            isDone: true,
          });
        }, nextProps.location.pathname, nextProps.location.search);
      });

    }
  }

  componentDidUpdate(n, m) {
    console.log(this.state.data);
    // console.log(n, m);
  }

  loadMore(page) {
    if (this.state.data.length > 0) {
      const lastItem = this.state.data[this.state.data.length-1];
      const lastItemId = lastItem.name;
      RedditAPI.fetchRedditCommentsJson(data=>this.setState({data: [...this.state.data, ...data]}), this.props.location.pathname, `?count=25&after=${lastItemId}`);
    }
  }

  render() {
    return (
      <div>
          {/* <InfiniteScroll
            loader={<div className="loader">Loading ...</div>}
            hasMore={true}
            loadMore={this.loadMore}>
          <RedditUIRoot {...this.props} {...this.state}/>
         </InfiniteScroll> */}
        <CommentsUI {...this.props} {...this.state} />
      </div>
    )
  }
}

const Thread = ({data}) => (
  <div style={styles.center}>
    <article style={styles.row}>
      <div>{data.title}</div>
      <div style={styles.subtitle}>{data.selftext}</div>
    </article>
  </div>
)

const CommentsUI = (props) => (
  <div style={props.style}>
     {/* {props.data.length>0 && <NavLink to={props.data[0].subreddit_name_prefixed}>{props.data[0].subreddit_name_prefixed}</NavLink>}   */}
    {/* <h1 style={styles.header}>{props.location.pathname}</h1>  */}
    <div style={styles.center} >
      {props.data.map(
        (data, i)=>(
          <article key={data.name} style={{borderLeft: "1px solid black"}}>
            <div style={styles.row}>
              {/* <span style={styles.numbering}>{i+1}</span> */}
              {/* <span style={styles.numbering}>[-]</span> */}
              <div>
                <div>{data.body}</div>
                <Subtitle data={data}/>
              </div>
            </div>
            {data.replies && <CommentsUI style={{paddingLeft: '1em'}} location={props.location} data={data.replies.data.children.map(line=>line.data)} />}  
          </article>
        )
      )}
      {/* {props.data.length>0 && 
        <NavLink style={styles.header} to={ `${props.location.pathname}?count=25&after=${props.data[props.data.length-1].name}` }>next</NavLink>
      } */}
    </div>
  </div>
);

const Subtitle = ({data}) => (
  <div style={styles.subtitle}>
    {/* <span><NavLink style={styles.link} to={data.subreddit}>{data.subreddit_name_prefixed}</NavLink></span> */}
    <span>{` | ${data.score} point`}</span>
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
