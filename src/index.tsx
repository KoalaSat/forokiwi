/**
 * index.tsx
 *
 * This is the entry file for the application.
 */

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import * as React from 'react'
import ReactDOM from 'react-dom/client'

// Use consistent styling
import 'sanitize.css/sanitize.css'

// Import root app
import { App } from 'app'

import { HelmetProvider } from 'react-helmet-async'

// Initialize languages
import './locales/i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HelmetProvider>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </HelmetProvider>,
)
