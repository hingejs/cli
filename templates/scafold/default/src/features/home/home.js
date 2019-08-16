import {
  HtmlCache,
  RouterService
} from '../../../services/index.js'

const RouteCtrl = async (req, next) => {
  const $routeDisplay = document.querySelector('route-display')
  await $routeDisplay.insertContent(HtmlCache.get('home/home.html'))
  next()
}

RouterService
  .defaultPath('/home', RouteCtrl)
