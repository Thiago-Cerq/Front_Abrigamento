import { Link } from 'react-router-dom'
import './NavBar.css'

// Assets
import CompleteLogo from '../assets/complete-logo.png'
import IconePerfil from '../assets/icone-perfil.png'
import IconeLogout from '../assets/icone-logout.png'

function NavBar() {

  return (
    <>

      <nav className='navbar bg-body-tertiary'>


        <div className='title-div'>
          <Link to='/'>
            <img src={CompleteLogo} alt="Logo ESVirtual" className='complete-logo'/>
          </Link>

          <div className='division-line-left'></div>
          <h1 className='site-title'>Escritório Social Virtual | Plataforma Web</h1>
          <h1 className='version-title'>(Versão 0.0.0)</h1>
        </div>

        <h2 className='data-user'> <b>Nome Sobrenome (Administrador do sistema)</b> <br />
        000.000.000-00 <br />
        Escritório Social do(a) ESTADO
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