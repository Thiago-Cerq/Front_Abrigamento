import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuBar.css'

// Assets
import BlueDownArrow from '../../assets/blue-down-arrow-menu.png'


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

function DropdownMenuItem(props: {title: string, path:string, options: Array<string>}){

  const [open, setOpen] = useState(false)

  return (
    <>
    <NavLink to={props.path} className='menu-items' onClick={() => {setOpen(!open)}}>
        <h4 className='menu-item-name'> {props.title} </h4>
        <div className='arrow-menu'></div>
    </NavLink>

    <div className='separate-line'></div>

    <div className={`submenu-trigger ${open? 'active' : 'inactive'}`}>
      <NavLink to='/modulos/tratamento-ao-uso-de-drogas' className='menu-items'>
          <h4 className='menu-subitem-name'> Tratamento ao uso abusivo de álcool e outras drogas </h4>
      </NavLink>

      <div className='separate-line'></div>

      <NavLink to='/modulos/assistencia-juridica-gratuita' className='menu-items'>
          <h4 className='menu-subitem-name'> Assistência jurídica gratuita </h4>
      </NavLink>

      <div className='separate-line'></div>
    </div>

    </>
  )
}

const modulesOptions = [
  'Abrigamento temporário', 'Alimentação',
  'Direções e endereços úteis', 'Assistência jurídica gratuita',
  'Tratamento ao uso abusivo de álcool e outras drogas', 'Outros serviços'
]

export default MenuBar