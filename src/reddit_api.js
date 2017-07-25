export default class RedditAPI {


  // static fetchRedditJson = (callback, url='', query='') => {
  //   const BASEURL = 'https://oauth.reddit.com';
  //   const URL = BASEURL + url + query;
  //   fetch(URL, {
  //     headers: {
  //       "Authorization": "bearer qMEORWAdLsDJTsUCcVGmEhxf9No"
  //     },
  //     accept: 'application/json'
  //   })
  //   .then(resp=>resp.json())
  //   .then(json=>{
  //     if (json.error) {
  //       throw new Error();
  //     } else {
  //       return json;
  //     }
  //   })
  //   .then(data=>data.data.children)
  //   .then(lines=>lines.map(line=>line.data))
  //   .then(data=>callback(data))
  //   .catch(err=>{
  //     // refresh access token
  //     const URL = 'https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=42374333--V_gvWqk0cOOr5ol4GJ6F9elgv8';
  //     fetch(URL, {
  //       method: "POST",
  //       headers: {
  //         "Authorization": "Basic WThoRW5IczdzOEIwc3c6"
  //       },
  //       accept: 'application/json'
  //     })
  //     .then(resp=>resp.json())
  //     .then(data=>{
  //       const access_token = data["access_token"];
  //       const BASEURL = 'https://oauth.reddit.com';
  //       const URL = BASEURL + url + query;
  //       fetch(URL, {
  //         headers: {
  //           "Authorization": "bearer " + access_token
  //         },
  //         accept: 'application/json'
  //       })
  //       .then(resp=>resp.json())
  //       .then(data=>data.data.children)
  //       .then(lines=>lines.map(line=>line.data))
  //       .then(data=>callback(data))
  //     })
  //   })
  // }

  constructor() {
    this.getAccessToken = (callback) => {
      console.log('retrieving access token...')
      // refresh access token
      const URL = 'https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=42374333--V_gvWqk0cOOr5ol4GJ6F9elgv8';
      fetch(URL, {
        method: "POST",
        headers: {
          "Authorization": "Basic WThoRW5IczdzOEIwc3c6"
        },
        accept: 'application/json'
      })
      .then(resp=>resp.json())
      .then(data=>{
        this.access_token = data["access_token"];
        callback();
      });
    }

    this.getSubreddit = (callback, url='', query='') => {
      if (this.access_token) {
        console.log('access_token available')
        const BASEURL = 'https://oauth.reddit.com';
        const URL = BASEURL + url + query;
        fetch(URL, {
          headers: {
            "Authorization": "bearer " + this.access_token
          },
          accept: 'application/json'
        })
        .then(resp=>resp.json())
        .then(data=>data.data.children)
        .then(lines=>lines.map(line=>line.data))
        .then(data=>callback(data))
      } else {
        console.log('access_token xxx')
        this.getAccessToken(()=> {
          this.getSubreddit(callback, url, query)
        })
      }
    }
  }


  static fetchRedditJson = (callback, url='', query='') => {
    // refresh access token
    const URL = 'https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=42374333--V_gvWqk0cOOr5ol4GJ6F9elgv8';
    fetch(URL, {
      method: "POST",
      headers: {
        "Authorization": "Basic WThoRW5IczdzOEIwc3c6"
      },
      accept: 'application/json'
    })
    .then(resp=>resp.json())
    .then(data=>{
      const access_token = data["access_token"];
      const BASEURL = 'https://oauth.reddit.com';
      const URL = BASEURL + url + query;
      fetch(URL, {
        headers: {
          "Authorization": "bearer " + access_token
        },
        accept: 'application/json'
      })
      .then(resp=>resp.json())
      .then(data=>data.data.children)
      .then(lines=>lines.map(line=>line.data))
      .then(data=>callback(data))
    })
  }


  static fetchRedditCommentsJson = (callback, url='', query='') => {
    const URL = 'https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=42374333--V_gvWqk0cOOr5ol4GJ6F9elgv8';
    fetch(URL, {
      method: "POST",
      headers: {
        "Authorization": "Basic WThoRW5IczdzOEIwc3c6"
      },
      accept: 'application/json'
    })
    .then(resp=>resp.json())
    .then(data=>{
      const access_token = data["access_token"];
      const BASEURL = 'https://oauth.reddit.com';
      const URL = BASEURL + url + query;
      fetch(URL, {
        headers: {
          "Authorization": "bearer " + access_token
        },
        accept: 'application/json'
      })
      .then(resp=>resp.json())
      .then(data=>data[1].data.children)
      .then(lines=>lines.map(line=>line.data))
      .then(data=>callback(data))
    })
  }


}

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

// var request = require('request');

// export default class RedditAPI {
//   static fetchRedditJson = (callback, url='', query='') => {
//     const URL = 'https://www.reddit.com' + url + '.json' + query;
//     console.log(URL);
//     request(URL, function (error, response, body) {
//       if (!error) {
//         const data = JSON.parse(body);
//         const lines = data.data.children;
//         callback(lines.map(line=>line.data));
//       }
//     });
//   }
// }


// export default class RedditAPI {
//   static fetchRedditJson = (callback, url='', query='') => callback([])
// }