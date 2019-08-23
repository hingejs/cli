import { HtmlCache } from 'services/index.js'
import { Router } from '@hingejs/services'

const RouteCtrl = async (req, next) => {
  const $routeDisplay = document.querySelector('route-display')
  await $routeDisplay.insertContent(HtmlCache.get('features/home/home.html'))
  next()
}

Router
  .defaultPath('/home', RouteCtrl)
