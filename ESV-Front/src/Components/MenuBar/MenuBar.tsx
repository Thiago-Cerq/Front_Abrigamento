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
        <DropdownMenuItem title='Módulos do ESVirtual' path='modules' options={modulesOptions}/>
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

  return (
    <>
    <NavLink to={props.path} className='menu-items'>
        <h4 className='menu-item-name'> {props.title} </h4>
        <img src={BlueDownArrow} alt="seta azul para baixo" className='arrow-menu'/>
      </NavLink>

    <div className='separate-line'></div>

    </>
  )
}

const modulesOptions = [
  'Abrigamento temporário', 'Alimentação',
  'Direções e endereços úteis', 'Assistência jurídica gratuita',
  'Tratamento ao uso abusivo de álcool e outras drogas', 'Outros serviços'
]

export default MenuBar