import React from 'react';
import {render} from 'react-snapshot';
// import {Router, Route, browserHistory} from 'react-router';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from './App';
import './index.css';

// CK: reddit router
render(
  <Router>
    <div>
      {/* <Route exact path="/" component={App}/> */}
      <Route exact path="/" render={()=>(<Redirect to="/r/popular" />)} />
      <Route path="/r/:pathname" component={App}/>
      {/* <Route path="*" render={_=>(<App />)} /> */}
    </div>
  </Router>,
  document.getElementById('root')
);