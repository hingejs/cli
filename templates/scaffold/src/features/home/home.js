import { Router } from '@hingejs/services'
import HTML from 'features/home/home.html'

const RouteCtrl = async (req, next) => {
  const $routeDisplay = document.querySelector('h-route-display')
  await $routeDisplay.insertContent(HTML)
  next()
}

Router
  .defaultPath('/home', Router.customElementsReady, RouteCtrl)
