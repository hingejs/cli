export default class Observable {

  constructor() {
    this.observers = new Map()
  }

  subscribe(f) {
    const uid = window.btoa(f.toString())
    this.observers.set(uid, f)
    return { unsubscribe: this.unsubscribe.bind(this, uid) }
  }

  unsubscribe(uid) {
    this.observers.delete(uid)
  }

  complete() {
    this.observers = new Map()
  }

  notify(msg) {
    this.observers.forEach(observer => observer(msg))
  }
}
