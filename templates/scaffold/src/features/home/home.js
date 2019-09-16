import HTMLTemplate from 'features/home/home.html'
import { Router } from '@hingejs/services'

const RouteCtrl = async (req, next) => {
  const $routeDisplay = document.querySelector('h-route-display')
  await $routeDisplay.insertContent(HTMLTemplate)
  next()
}

Router
  .defaultPath('/home', Router.customElementsReady, RouteCtrl)
