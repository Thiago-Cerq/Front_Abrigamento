import { useState, useEffect, useRef } from 'react'
import './NavBar.css'
import MenuBar from './MenuBar/MenuBar'
import Footer from './Footer/Footer'

// Assets
import MenuButtonHover from '../assets/menu-button-hover.png'
import CompleteLogo from '../assets/complete-logo.png'
import IconePerfil from '../assets/icone-perfil.png'
import IconeLogout from '../assets/icone-logout.png'

function NavBar() {

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

      <nav className='navbar bg-body-tertiary'>


        <div className='title-div'>
          <a href="">
            <img src={CompleteLogo} alt="Logo ESVirtual" className='complete-logo'/>
          </a>

          <div className='division-line-left'></div>
          <h1 className='site-title'>Escritório Social Virtual | Plataforma Web</h1>
          <h1 className='version-title'>(Versão 0.0.0)</h1>
        </div>

        <h2 className='data-user'> <b>Nome Sobrenome (Administrador do sistema)</b> <br />
        000.000.000-00 <br />
        Escritório Social do(a) ??????????????????
        </h2> 
        {/* ver depois a melhor formatação dos dados do usuário */}

        <div className='perfil-logout-div'>
          <a href="">
            <img src={IconePerfil} alt="Perfil" className='icon-perfil'/>
          </a>
          <div className='division-line-right'></div>
          <a href="">
            <img src={IconeLogout} alt="Logout" className='icon-logout'/>
          </a>
        </div>
      </nav>

    </>
  )
}

export default NavBar