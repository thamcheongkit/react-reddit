import React from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
import RedditAPI from './reddit_api';
// import RedditUIRoot from './RedditUI';
import App from './App';

var API = new RedditAPI();

const DEFAULT_SUBREDDITS = ["/r/popular", "/r/announcements", "/r/Art", "/r/AskReddit", "/r/askscience", "/r/aww", "/r/blog", "/r/books", "/r/creepy", "/r/dataisbeautiful", "/r/DIY", "/r/Documentaries", "/r/EarthPorn", "/r/explainlikeimfive", "/r/Fitness", "/r/food", "/r/funny", "/r/Futurology", "/r/gadgets", "/r/gaming", "/r/GetMotivated", "/r/gifs", "/r/history", "/r/IAmA", "/r/InternetIsBeautiful", "/r/Jokes", "/r/LifeProTips", "/r/listentothis", "/r/mildlyinteresting", "/r/movies", "/r/Music", "/r/news", "/r/nosleep", "/r/nottheonion", "/r/OldSchoolCool", "/r/personalfinance", "/r/philosophy", "/r/photoshopbattles", "/r/pics", "/r/science", "/r/Showerthoughts", "/r/space", "/r/sports", "/r/television", "/r/tifu", "/r/todayilearned", "/r/TwoXChromosomes", "/r/UpliftingNews", "/r/videos", "/r/worldnews", "/r/WritingPrompts"];

const ColumnView = (props) => {
    console.log(props);
    return (
        <div style={styles.root}>
            {
                DEFAULT_SUBREDDITS.map(subreddit=>(
                    <App key={subreddit} style={styles.contentRoot} location={{pathname: subreddit}} />
                ))
            }
        </div>
    )
}

const styles = {
    root: {
        display: 'flex',
        margin: 'auto'
    },
    contentRoot: {
        minWidth: '50em'
    }
}

export default ColumnView;