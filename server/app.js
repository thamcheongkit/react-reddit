// from:
// https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.1i3ghstyr

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

var proxy = require('express-http-proxy');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// CK: toggle production environment
process.env.NODE_ENV = 'production'

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/v1', proxy('www.reddit.com'));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;