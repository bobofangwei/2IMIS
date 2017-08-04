import originJSONP from 'jsonp';

export default function jsonp(url, data, option) {
  url = (url.indexOf('?') < 0 ? : '?': '&') + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function param(data) {
  let result = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    result += `&${k}=${encodeURIComponent(value)}`;
  }
  return result ? result.substring(1) : '';
}
