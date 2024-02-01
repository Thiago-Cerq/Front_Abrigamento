import { useState } from 'react'
import './NavBar.css'

// Assets
import MenuButtonHover from '../assets/menu-button-hover.png'
import CompleteLogo from '../assets/complete-logo.png'
import IconePerfil from '../assets/icone-perfil.png'
import IconeLogout from '../assets/icone-logout.png'

function NavBar() {

  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <a href="">
          <img src={MenuButtonHover} alt="Menu Button Hover" className='menubuttonhover'/>
        </a>

        <a href="">
          <img src={CompleteLogo} alt="Logo ESVirtual" className='completelogo'/>
        </a>

        <div className='divisionlineleft'></div>

        <div className='titlediv'>
          <h1 className='sitetitle'>Escritório Social Virtual | Plataforma Web</h1>
          <h1 className='versiontitle'>(Versão 0.0.0)</h1>
        </div>

        <h2 className='dadosuser'> <b>Nome Sobrenome (Administrador do sistema)</b> <br />
        000.000.000-00 <br />
        Escritório Social do ??????????????????
        </h2> 
        {/* ver depois a melhor formatação dos dados do usuário */}

        <a href="">
          <img src={IconePerfil} alt="Perfil" className='iconeperfil'/>
        </a>

        <div className='divisionlineright'></div>

        <a href="">
          <img src={IconeLogout} alt="Logout" className='iconelogout'/>
        </a>
      </nav>
    </>
  )
}

export default NavBar