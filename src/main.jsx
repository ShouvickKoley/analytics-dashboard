import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// HashRouter (rather than BrowserRouter) so client-side routes
// (/#/activity, /#/settings, ...) work correctly on static hosts like
// GitHub Pages that don't rewrite unknown paths back to index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
