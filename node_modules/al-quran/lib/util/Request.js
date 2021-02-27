const axios = require('axios')

class Request {
  constructor(baseURL = 'https://api.banghasan.com/quran/format/json') {
    this.baseURL = baseURL
  }

  urlBuilder(parameter, args) {
    let url = this.baseURL

    if(args) {
      parameter.forEach((param, i) => {
        url += `/${param}/${args[i]}`
      });
    }else {
      url += '/' + parameter.filter(x => x).join('/')
    }

    return url
  }

  async send(parameter, args) {
    const url = this.urlBuilder(parameter, args)
    const res = await axios(url)

    if (res.status !== 200) return Promise.reject(new Error(res.status))
        
    return Promise.resolve(res.data)
  }

}

module.exports = Request