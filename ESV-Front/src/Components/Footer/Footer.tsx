import './Footer.css'

// Assets
import LogoCNJ from '../../assets/logocnj.png'

function Footer() {

  return (
    <>
     <div className='footer-background'>
        <a href="https://www.cnj.jus.br/" target='_blank'><img src={LogoCNJ} alt="Logo CNJ" className='logo-cnj' /> </a>
     </div>
    </>
  )
}

export default Footer