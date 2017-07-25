import React from 'react';
import ReactDOMServer from 'react-dom/server';
import logo from './settings.svg';
// import './AppPrerenderer.css';

exports.prerender = function () {
  return ReactDOMServer.renderToString(<div style={styles.center}><img src={logo} className="Logo" style={styles.logo}/></div>)
}

const styles = {
  logo: {
    height: '10em',
    margin: 'auto',
  },
  center: {
    textAlign: 'center'
  }
}