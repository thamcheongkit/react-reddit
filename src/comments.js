import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import RedditAPI from './reddit_api';

// import RedditUIRoot from './RedditUI';

const NodeCache = require( "node-cache" );
const cache = new NodeCache();

// var cache = require('memory-cache');

export default class Comments extends React.Component {
  constructor() {
    super();
    this.state = {data: []}
  }

  componentDidMount() {
    RedditAPI.fetchRedditCommentsJson(
      data=>this.setState({data: data}),
      this.props.location.pathname, 
      this.props.location.search
    )
  }

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname ||
        this.props.location.search !== nextProps.location.search) {
      RedditAPI.fetchRedditCommentsJson(
        data=>this.setState({data: data}),
        this.props.location.pathname, 
        this.props.location.search
      )
    }
  }

  render() {
    return (<CommentsRoot {...this.props} {...this.state} />)
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

// class CommentsRoot extends React.Component {
//   constructor() {
//     super();
//     this.state = {display: true};
//     this.toggle = this.toggle.bind(this);
//   }

//   toggle() {
//     this.setState({display: !this.state.display})
//   }

//   render() {
//     if (this.state.display) {
//       return (
//         <div style={this.props.style} onClick={this.toggle}>
//           {/* {props.data.length>0 && <NavLink to={props.data[0].subreddit_name_prefixed}>{props.data[0].subreddit_name_prefixed}</NavLink>}   */}
//           {/* <h1 style={styles.header}>{props.location.pathname}</h1>  */}
//           <div style={styles.center} >
//             {this.props.data.map(
//               (data, i)=>(
//                 <article key={data.name} style={{borderLeft: "1px solid black"}}>
//                   <div style={styles.row}>
//                     {/* <span style={styles.numbering}>{i+1}</span> */}
//                     {/* <span style={styles.numbering}>[-]</span> */}
//                     <div>
//                       <div>{data.body}</div>
//                       <Subtitle data={data}/>
//                     </div>
//                   </div>
//                   {data.replies && <CommentsUI style={{paddingLeft: '1em'}} location={this.props.location} data={data.replies.data.children.map(line=>line.data)} />}  
//                 </article>
//               )
//             )}
//             {/* {props.data.length>0 && 
//               <NavLink style={styles.header} to={ `${props.location.pathname}?count=25&after=${props.data[props.data.length-1].name}` }>next</NavLink>
//             } */}
//           </div>
//         </div>
//       )
//     } else {
//       return (<div style={this.props.style} onClick={this.toggle}>...</div>)
//     }
//   }
// }

const CommentsRoot = (props) => (
  <div style={props.style}>
    <div style={styles.center} >
      {props.data.map( (data, i)=><Commentz key={data.name} {...props} data={data} /> )}
    </div>
  </div>
);

class Commentz extends React.Component {
  constructor() {
    super();
    this.state = {display: true};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({display: !this.state.display})
  }

  render() {
    const {data} = this.props;
    const props = this.props;
    console.log(data);

    if (this.state.display) {
      return (
        <article style={{borderLeft: "1px solid black"}}>
          <div style={styles.row}>
            <div>
              <div onClick={this.toggle}>{data.body}</div>
              <Subtitle data={data}/>
            </div>
          </div>
          {data.replies && 
            <CommentsRoot
              {...props}
              style={{paddingLeft: '1em'}} 
              location={props.location}
              data={data.replies.data.children.map(line=>line.data)} />
          }
        </article>
      )
    } else {
      return (
        <div onClick={this.toggle}>...</div>
      )
    }
  }
}


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
