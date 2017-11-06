
export default class RedditAPI2{
  static get = (data, callback) => {
    fetch(`https://www.reddit.com${data.pathname}.json${data.search || ''}`, {accept: 'application/json'})
      .then(r=>r.json())
      .then(data=>data.data.children)
      .then(lines=>lines.map(line=>line.data))
      .then(data=>callback(data))
  }

  static getComment = (data, callback) => {
    fetch(`https://www.reddit.com${data.pathname}.json${data.search || ''}`, {accept: 'application/json'})
      .then(r=>r.json())
      .then(data=>data[1].data.children)
      .then(lines=>lines.map(line=>line.data))
      .then(data=>callback(data))
  }
}