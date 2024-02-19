import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuBar.css'
import { modulesOptions } from '../../Pages/modules/modules'

// Assets
import MenuButtonHover from '../../assets/menu-button-hover.png'
import MenuCloseHover from '../../assets/menu-close-hover.png'



function MenuBar() {
  const [open, setOpen] = useState(false)

  return (
    <>

      <div>
        <div onClick={() => {setOpen(!open)}}>
          <img src={MenuButtonHover} alt="Menu Button Hover" className={`menu-button-hover ${open? 'active' : 'inactive'}`}/>
          <img src={MenuCloseHover} alt="Menu Button Hover" className={`menu-close-hover ${open? 'active' : 'inactive'}`}/>
        </div>

        <div className={`menu-trigger ${open? 'active' : 'inactive'}`}>

            <div className='menu-background'>
              <div onClick={() => {setOpen(false)}}>
                <SimpleMenuItem title='Página Inicial' path='/'/>
              </div>
              <div>
                <DropdownMenuItem title='Módulos do ESVirtual' path='modulos' options={modulesOptions}/>
              </div>
              <div onClick={() => {setOpen(false)}}>
                <SimpleMenuItem title='Funcionários do Escritório Social' path='/funcionarios'/>
              </div>
          </div>
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
  
  const el = document.getElementById('trigger-submenu')

  return (
    <>
    <NavLink to={props.path} className='menu-items' id='trigger-submenu'>
        <h4 className='menu-item-name'> {props.title} </h4>
        <div className='arrow-trigger' onClick={() => {setOpen(!open)}}>
          <div className={`arrow-menu ${open? 'active' : 'inactive'}`}></div>
        </div>
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

export default MenuBar
