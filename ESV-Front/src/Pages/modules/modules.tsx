import './modules.css'
import { Link } from 'react-router-dom'

// Assets
import BannerAbrigamentoTemporario from '../../assets/banner-moradia-temporaria.png'
import BannerAlimentacao from '../../assets/banner-alimentacao.png'
import BannerDirecoesEEnderecos from '../../assets/banner-direcoes-e-enderecos-uteis.png'
import BannerAssistenciaJuridica from '../../assets/banner-principal-assistencia-juridica-gratuita.png'
import BannerTratamentoDrogas from '../../assets/banner-tratamento-ao-uso-abusivo-de-alcool-e-outras-drogas.png'
import BannerOutrosServicos from '../../assets/banner-principal-outros-servicos.png'


function Modules() {

  return (
    <>
    <div className='container'>
    <hr />


    <p className='p-modules'>Selecione o módulo que deseja visualizar e/ou editar informações:</p>

      <ModuleBox options={modulesOptions}/>


    </div>
    </>

    
  )
}

function ModuleBox(props: {options: {option: string, path: string, img: string}[]}) {
  return (
    <div className='modules-div'>
      {props.options.map(options =>
      <div className='module-space'> 
        <Link to={options.path} className='module-link'>
          <div className='module-box'>
            <img src={options.img} alt="modulo-img" className='module-img'/>
            <p className='module-p'>{options.option}</p>
          </div>
        </Link>
      </div>
      )}
    </div>

  )
}

export const modulesOptions = [
  {option: 'Abrigamento temporário', path: '/modulo-abrigamento-temporario',
   img: BannerAbrigamentoTemporario},
  {option: 'Alimentação', path: '/modulo-alimentacao', img: BannerAlimentacao},
  {option: 'Direções e endereços úteis', path: '/modulo-direcoes-e-enderecos-uteis',
   img: BannerDirecoesEEnderecos},
  {option: 'Assistência jurídica gratuita', path: '/modulo-assistencia-juridica-gratuita',
   img: BannerAssistenciaJuridica},
  {option: 'Tratamento ao uso abusivo de álcool e outras drogas', path: '/modulo-tratamento-ao-uso-de-drogas',
   img: BannerTratamentoDrogas},
  {option: 'Outros serviços', path: '/modulo-outros-servicos', img: BannerOutrosServicos},
]



export default Modules