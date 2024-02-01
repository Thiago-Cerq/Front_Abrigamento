import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar.tsx'
import MenuBar from './Components/MenuBar/MenuBar.tsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
)
