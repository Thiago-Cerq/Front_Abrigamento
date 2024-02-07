import { Outlet } from 'react-router-dom'
import './Components.css'
import NavBar from './NavBar'
import MenuBar from './MenuBar/MenuBar'
import Footer from './Footer/Footer'

// Assets

function Components() {


  return (
    <>

      <MenuBar />

      <NavBar />
      <Outlet />
      <Footer />

    </>
  )
}

export default Components