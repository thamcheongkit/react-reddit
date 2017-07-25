import React from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
import RedditAPI from './reddit_api';
// import RedditUIRoot from './RedditUI';
import UI from './ui/ui';

// var cache = require('memory-cache');

var API = new RedditAPI();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {data: []}
  }

  componentDidMount() {
    API.getSubreddit(
      data=>this.setState({data: data}),
      this.props.location.pathname, 
      this.props.location.search
    )
  }

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname ||
        this.props.location.search !== nextProps.location.search) {
      API.getSubreddit(
        data=>this.setState({data: data}),
        this.props.location.pathname, 
        this.props.location.search
      )
    }
  }

  render() {
    return (<UI {...this.props} {...this.state} />)
  }
}

// API.getAccessToken(_=>undefined);
// console.log(API.access_token);

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: [],
//       pathname: this.props.location.pathname,
//       search: this.props.location.search
//     };

//     this.componentDidMount = this.componentDidMount.bind(this);
//     // this.componentDidUpdate = this.componentDidUpdate.bind(this);
//     // this.componentWillUpdate = this.componentWillUpdate.bind(this);
//     this.loadMore = this.loadMore.bind(this);
//   }

//   componentDidMount() {
//     console.log('first mounted!');
//     // RedditAPI.fetchRedditJson(data=>{
//       // cache.set(this.props.location.pathname, data);
//     //   this.setState({data: data, isDone: true});
//     // }, this.props.location.pathname, this.props.location.search);

//     API.getSubreddit(data=>{
//       cache.set(this.props.location.pathname, data);
//       this.setState({data: data, isDone: true});
//     }, this.props.location.pathname, this.props.location.search);
//   }

//   componentWillUpdate(nextProps) {
//     if (this.state.pathname !== nextProps.location.pathname || this.state.search !== nextProps.location.search) {
//       this.setState(
//         {
//           pathname: nextProps.location.pathname,
//           search: nextProps.location.search,
//         }, 
//         // callback from setState
//         () => {
//           // RedditAPI.fetchRedditJson(data=>{
//           //   cache.set(nextProps.location.pathname, data);
//           //   this.setState({
//           //     data: data,
//           //     isDone: true,
//           //   });
//           // }, nextProps.location.pathname, nextProps.location.search);

//           console.log('getting subreddit')
//           API.getSubreddit(data=>{
//             cache.set(nextProps.location.pathname, data);
//             this.setState({
//               data: data,
//               isDone: true,
//             });
//           }, nextProps.location.pathname, nextProps.location.search);
        
//           // cache.get(nextProps.location.pathname, (e,d)=>{
//           //   if (!e && d) {
//           //     this.setState({
//           //       data: cache.get(this.props.location.pathname),
//           //     });
//           //     console.log('use data from cache');
//           //   }
//           // });

//           //   RedditAPI.fetchRedditJson(data=>{
//           //     cache.set(nextProps.location.pathname, data);
//           //     this.setState({
//           //       data: data,
//           //       isDone: true,
//           //     });
//           //   }, nextProps.location.pathname, nextProps.location.search);
//           // });

//         }
//       );
//     }
//   }

//   componentDidUpdate(n, m) {
//     // console.log(this.state.data);
//     // console.log(n, m);
//   }

//   loadMore(page) {
//     if (this.state.data.length > 0) {
//       const lastItem = this.state.data[this.state.data.length-1];
//       const lastItemId = lastItem.name;
//       RedditAPI.fetchRedditJson(data=>this.setState({data: [...this.state.data, ...data]}), this.props.location.pathname, `?count=25&after=${lastItemId}`);
//     }
//   }

//   render() {
//     return (
//       <div>
//           {/* <InfiniteScroll
//             loader={<div className="loader">Loading ...</div>}
//             hasMore={true}
//             loadMore={this.loadMore}>
//           <RedditUIRoot {...this.props} {...this.state}/>
//          </InfiniteScroll> */}
//           <UI {...this.props} {...this.state} />
//       </div>
//     )
//   }
// }
