import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './components/Home'
import { MainAnimation } from './components/MainAnimation'
import './style.css'

function App() {
  return (
    <>
      {/* <MainAnimation /> */}
      <Home />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
