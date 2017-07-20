// export default class RedditAPI {
//   static fetchRedditJson = (callback, url='', query='') => {
//     const URL = (process.env.NODE_ENV === 'production') ? '/v1' + url + '.json' + query : url + '.json' + query;
//     fetch(URL, {accept: 'application/json',})
//       .then(resp=>resp.json())
//       .then(data=>data.data.children)
//       .then(lines=>lines.map(line=>line.data))
//       .then(data=>callback(data))
//   }
// }

var request = require('request');

export default class RedditAPI {
  static fetchRedditJson = (callback, url='', query='') => {
    const URL = 'https://www.reddit.com' + url + '.json' + query;
    console.log(URL);
    request(URL, function (error, response, body) {
      if (!error) {
        const data = JSON.parse(body);
        const lines = data.data.children;
        callback(lines.map(line=>line.data));
      }
    });
  }
}