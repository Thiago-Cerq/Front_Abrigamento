import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import './Components.css'
import NavBar from './NavBar'
import MenuBar from './MenuBar/MenuBar'
import Footer from './Footer/Footer'

// Assets
import MenuButtonHover from '../assets/menu-button-hover.png'
import MenuCloseHover from '../assets/menu-close-hover.png'

function Components() {

  // Dropdown Menu
  const [open, setOpen] = useState(false)

  return (
    <>

      <div>
        <div onClick={() => {setOpen(!open)}}>
          <img src={MenuButtonHover} alt="Menu Button Hover" className={`menu-button-hover ${open? 'active' : 'inactive'}`}/>
          <img src={MenuCloseHover} alt="Menu Button Hover" className={`menu-close-hover ${open? 'active' : 'inactive'}`}/>
        </div>

        <div className={`menu-trigger ${open? 'active' : 'inactive'}`}>
            <MenuBar />
          </div>
      </div>

      <NavBar />
      <Outlet />
      <Footer />

    </>
  )
}

export default Components