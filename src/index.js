import React from 'react';
import {render} from 'react-snapshot';
// import {Router, Route, browserHistory} from 'react-router';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from './App';
import Comments from './comments';
import ColumnView from './ColumnView';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// CK: reddit router
render(
  <Router>
    <div>
      {/* <Route exact path="/" component={App}/> */}
      {/*<Route exact path="/" render={()=>(<Redirect to="/r/popular" />)} />*/}
      <Route exact path="/" component={ColumnView} />
      <Route exact path="/r/:pathname" component={App}/>
      <Route path="/r/:pathname/comments" component={Comments} />
      {/* <Route path="*" render={_=>(<App />)} /> */}
    </div>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
