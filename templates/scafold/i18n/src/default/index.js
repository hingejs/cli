import './default.css'
import { RouterService } from '../route/index.js'

const HomeCtrl = (req, next) => {
  req.load('default')
  next()
}

RouterService
  .defaultPath(HomeCtrl)
