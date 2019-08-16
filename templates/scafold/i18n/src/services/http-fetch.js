import Observable from './observable.js'
export default class HttpFetch extends Observable {

  constructor() {
    super()
  }

  httpFetch(url, body, verb) {
    let myHeaders = new Headers()
    myHeaders.set('Content-Type', 'application/json')
    let myInit = { cache: 'default', headers: myHeaders, method: verb, mode: 'cors' }
    if (body) {
      myInit.body = JSON.stringify(body)
    }
    const myRequest = new Request(url, myInit)
    return fetch(myRequest)
      .then(response => {
        if (!response.ok) {
          throw Error(response)
        }
        return response.json()
      })
      .then(json => this.notify(json))
      .catch(error => this.notify(error))
  }

  get(url) {
    return {
      subscribe: (f) => {
        const unsubscribe = this.subscribe.call(this, f)
        this.httpFetch(url, null, 'GET')
        return unsubscribe
      }
    }
  }

  post(url, body) {
    return {
      subscribe: (f) => {
        const unsubscribe = this.subscribe.call(this, f)
        this.httpFetch(url, body, 'POST')
        return unsubscribe
      }
    }
  }

  put(url, body) {
    return {
      subscribe: (f) => {
        const unsubscribe = this.subscribe.call(this, f)
        this.httpFetch(url, body, 'PUT')
        return unsubscribe
      }
    }
  }

  delete(url) {
    return {
      subscribe: (f) => {
        const unsubscribe = this.subscribe.call(this, f)
        this.httpFetch(url, null, 'DELETE')
        return unsubscribe
      }
    }
  }

}
