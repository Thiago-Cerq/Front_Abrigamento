import './Footer.css'

// Assets
import LogoCNJ from '../../assets/logocnj.png'

function Footer() {

  return (
    <>
     <div className='footerbackground'>
        <img src={LogoCNJ} alt="Logo CNJ" className='logocnj' />
     </div>
    </>
  )
}

export default Footer