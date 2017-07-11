import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import RedditAPI from './reddit_api';
import RedditUIRoot from './RedditUI'

let cache = {}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: JSON.parse(window.sessionStorage.getItem(this.props.location.pathname)) || []};
    // this.state = {data: []};
    // this.state = {data: cache[this.props.location.pathname] || []};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    RedditAPI.fetchRedditJson(data=>{
      this.setState({data: data, isDone: true});
      window.sessionStorage.setItem(this.props.location.pathname, JSON.stringify(data));
      // cache[this.props.location.pathnam]  = data;
    }, this.props.location.pathname);
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  loadMore(page) {
    if (this.state.data.length > 0) {
      const lastItem = this.state.data[this.state.data.length-1];
      const lastItemId = lastItem.name;
      RedditAPI.fetchRedditJson(data=>this.setState({data: [...this.state.data, ...data]}), this.props.location.pathname, `?count=25&after=${lastItemId}`);
    }
  }

  render() {
    return (
      <div>
        {/*<p>{JSON.stringify(this.props.location)}</p>*/}
        <InfiniteScroll
            loader={<div className="loader">Loading ...</div>}
            hasMore={true}
            loadMore={this.loadMore}>
          <RedditUIRoot {...this.props} {...this.state}/>
        </InfiniteScroll>
      </div>
    )
  }
}