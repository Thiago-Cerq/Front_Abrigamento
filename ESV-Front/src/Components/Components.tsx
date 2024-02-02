import { useState, useEffect, useRef } from 'react'
import NavBar from './NavBar'
import MenuBar from './MenuBar/MenuBar'
import Footer from './Footer/Footer'

// Assets
import MenuButtonHover from '../assets/menu-button-hover.png'

function Components() {

  // Dropdown Menu
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <div onClick={() => {setOpen(!open)}}>
          <img src={MenuButtonHover} alt="Menu Button Hover" className='menu-button-hover'/>
        </div>

        <div className={`menu-trigger ${open? 'active' : 'inactive'}`}>
            <MenuBar />
          </div>
      </div>

      <Footer />
      <NavBar />

    </>
  )
}

export default Components