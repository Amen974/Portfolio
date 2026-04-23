import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CursorProvider from './components/CursorProvider.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CursorProvider>
        <App />
      </CursorProvider>
    </BrowserRouter>
  </StrictMode>,
)
