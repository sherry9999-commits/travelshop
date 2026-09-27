import React from 'react'
import { createRoot } from 'react-dom/client'

import { I18nProvider } from './i18n/I18nContext.jsx'
import { enableMotionClass } from './lib/motion.js'
import App from './App.jsx'

import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/sections.css'

// Opt into GSAP initial states only when motion is allowed, so the page is
// always fully rendered without JS or with reduced motion.
enableMotionClass()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
)
