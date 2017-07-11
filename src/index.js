import React from 'react';
import {render} from 'react-snapshot';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import './index.css';

// CK: reddit router
render(
  <Router history={browserHistory}>
    <Route path="*" component={App}/>
  </Router>,
  document.getElementById('root')
);