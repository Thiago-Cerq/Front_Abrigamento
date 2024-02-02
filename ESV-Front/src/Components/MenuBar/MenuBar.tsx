import { useState } from 'react'
import './MenuBar.css'

// Assets
import BlueDownArrow from '../../assets/blue-down-arrow-menu.png'


function MenuBar() {

  return (
    <>
    <div className='menu-trigger'>
    <div className='menu-background'>
        <SimpleMenuItem title='Página Inicial' path='/'/>
        <DropdownMenuItem title='Módulos do ESVirtual'/>
        <DropdownMenuItem title='Funcionários do Escritório Social'/>
     </div>
    </div>
    </>
  )
}

function SimpleMenuItem(props: {title: string, path: string}){
  
  return (
    <>
    <div>
      <div className='menu-items'>
        <h4 className='menu-item-name'> {props.title} </h4>
      </div>
      </div>

      <div className='separate-line'></div>

    </>
  )
}

function DropdownMenuItem(props: {title: string}){

  return (
    <>
    <div>
    <div className='menu-items'>
        <h4 className='menu-item-name'> {props.title} </h4>
        <img src={BlueDownArrow} alt="seta azul para baixo" className='arrow-menu'/>
      </div>
    </div>

      <div className='separate-line'></div>
    </>
  )
}

export default MenuBar