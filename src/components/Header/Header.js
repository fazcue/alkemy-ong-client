import './Header.css'
import React, { useState } from 'react'
import { List, X, Sliders  } from 'react-bootstrap-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import {BASE_PATH} from '../../utils/constants'
import {customFetch} from '../../services/fetch'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {

  let location = useLocation()
  const userData = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }


  const handleDelete = () => {
    Swal.fire({
      title: 'Eliminar usuario',
      icon: 'warning',
      text: 'Verdaderamente desea eliminar su usuario?',
      showDenyButton:true,
      confirmButtonText: 'Si',
      denyButtonText: 'Cancelar'
    }).then(result=> {
      if(result.isConfirmed){
        const url = `${BASE_PATH}/users/${userData.id}`
        const properties = {
          method: 'delete'
        }
        customFetch(url, properties)
          .then(data => {
            toast.success( data.data , {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          })
            dispatch(logout())
            localStorage.removeItem('token')
            navigate('/')
          })
          .catch(error => {
            toast.error(error.message , {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          })
          })
      } else if (result.isDenied){
        Swal.fire('Se ha cancelado la eliminacion', '', 'info')
      }
    })


  }

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to='/'><img src="/images/logo.png" alt='SOMOS MAS' /></Link>
        </div>
        <nav>
          <Link to="/nosotros"><button className={`${location.pathname === "/nosotros" ? 'active' : '' }`}>Nosotros</button></Link>
          <Link to="/actividades"><button className={`${location.pathname === "/actividades" ? 'active' : '' }`}>Actividades</button></Link>
          <Link to="/novedades"><button className={`${location.pathname === "/novedades" ? 'active' : '' }`}>Novedades</button></Link>
          <Link to="/testimonios"><button className={`${location.pathname === "/testimonios" ? 'active' : '' }`}>Testimonios</button></Link>
          <Link to="/contacto"><button className={`${location.pathname === "/contacto" ? 'active' : '' }`}>Contacto</button></Link>
        </nav>
        <div className='account'>
          {userData.id ?
            <div>
              {userData.roleId === 1 && <Link to='backOffice'><button className='login'><Sliders/></button></Link>}
              <button className='register' onClick={handleLogout}>Cerrar Sesion</button>
            </div>
          :
            <div>
              <Link to='Login'><button className='login'>Log in</button></Link>
              <Link to='Registrarse'><button className='register'>Registrate</button></Link>
            </div>
          }
        </div>
        <BurguerIcon userData={userData} handleLogout={handleLogout} handleDelete={handleDelete}/>
      </div>
      <div className='hidden'></div>
      <ToastContainer/>
    </>
  )
}


function BurguerIcon({ userData, handleLogout, handleDelete }) {

  const [openMenu, setOpenMenu] = useState(false)

  return(
   <div className='burguer-container'>
   <div className='burguer-menu' onClick={() => setOpenMenu(!openMenu)}> 
    {!openMenu ? <List size={36}/> : <X size={36}/>}
   </div>
   {openMenu && <BurguerMenu setOpenMenu={setOpenMenu} openMenu={openMenu} userData={userData} handleLogout={handleLogout} handleDelete={handleDelete}/>}
   </div>
  )
}

function BurguerMenu({ setOpenMenu, openMenu, userData, handleLogout, handleDelete }) {

  let location = useLocation()

  return(

    <ul className='burguer-list'>
      {userData.id ? <li className='burguer-register' onClick={handleDelete}>Eliminar perfil</li> : null}
      {userData.id ? /*ARMAR EDICION DE PERFIL*/null : <Link to='Login'><li className='burguer-login' onClick={() => setOpenMenu(!openMenu)}>Login</li></Link>}
      {userData.id ? <li className='burguer-register' onClick={handleLogout}>Cerrar sesion</li> : <Link to='Registrarse'><li className='burguer-register' onClick={() => setOpenMenu(!openMenu)}>Registrate</li></Link>}
      <Link to="/nosotros" ><li  className={`${location.pathname === "/nosotros" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Nosotros</li></Link>
      <Link to="/actividades" ><li  className={`${location.pathname === "/actividades" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Actividades</li></Link>
      <Link to="/novedades" ><li  className={`${location.pathname === "/novedades" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Novedades</li></Link>
      <Link to="/testimonios" ><li  className={`${location.pathname === "/testimonios" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Testimonios</li></Link>
      <Link to="/contacto" ><li  className={`${location.pathname === "/contacto" ? 'active' : '' }`} onClick={() => setOpenMenu(!openMenu)}>Contacto</li></Link>
    
    </ul>

  )
}
