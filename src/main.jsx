import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  return (
    <main>
      <h1>MyProfile</h1>
      <p>Proyecto iniciado con React y Vite.</p>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
