import './styles/variables.css'
import './styles/main.css'
import './styles/components.css'

import { UIController } from './ui/index.js'
import { i18n } from './i18n/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const app = new UIController(i18n)
  app.init()
})
