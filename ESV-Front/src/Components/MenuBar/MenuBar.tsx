import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuBar.css'

// Assets



function MenuBar() {

  return (
    <>
    <div className='menu-trigger'>
    <div className='menu-background'>
        <SimpleMenuItem title='Página Inicial' path='/'/>
        <DropdownMenuItem title='Módulos do ESVirtual' path='modulos' options={modulesOptions}/>
        <SimpleMenuItem title='aaaaaaaaaaa' path='/funcionarios'/>

     </div>
    </div>
    </>
  )
}

function SimpleMenuItem(props: {title: string, path: string}){
  
  return (
    <>
    <NavLink to={props.path} className='menu-items'>
        <h4 className='menu-item-name'> {props.title} </h4>
      </NavLink>

      <div className='separate-line'></div>

    </>
  )
}

function DropdownMenuItem(props: {title: string, path:string, options: {option: string, path: string}[]}){

  const [open, setOpen] = useState(false)

  return (
    <>
    <NavLink to={props.path} className='menu-items' onClick={() => {setOpen(!open)}}>
        <h4 className='menu-item-name'> {props.title} </h4>
        <div className='arrow-menu'></div>
    </NavLink>

    <div className='separate-line'></div>

    <div className={`submenu-trigger ${open? 'active' : 'inactive'}`}>
      {props.options.map(options => <div>
        <NavLink to={options.path} className='menu-items'>
        <h4 className='menu-subitem-name'>{options.option}</h4>
        </NavLink>
        <div className='separate-line'></div>
        </div>
      )}
    </div>

    </>
  )
}

const modulesOptions = [
  {option: 'Abrigamento temporário', path: '/modulos/abrigamento-temporario'},
  {option: 'Alimentação', path: '/modulos/alimentacao'},
  {option: 'Direções e endereços úteis', path: '/modulos/direcoes-e-enderecos-uteis'},
  {option: 'Assistência jurídica gratuita', path: '/modulos/assistencia-juridica-gratuita'},
  {option: 'Tratamento ao uso abusivo de álcool e outras drogas', path: '/modulos/tratamento-ao-uso-de-drogas'},
  {option: 'Outros serviços', path: '/modulos/outros-servicos'},
]

export default MenuBar
