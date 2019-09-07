import { HtmlCache } from 'services'
import { Router } from '@hingejs/services'

const RouteCtrl = async (req, next) => {
  const $routeDisplay = document.querySelector('h-route-display')
  await $routeDisplay.insertContent(HtmlCache.get('features/home/home.html'))
  next()
}

Router
  .defaultPath('/home', Router.customElementsReady, RouteCtrl)
