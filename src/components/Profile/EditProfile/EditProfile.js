import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../../reducers/userReducer'
import { Navigate, useNavigate } from 'react-router-dom'
import './EditProfile.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BASE_PATH } from '../../../utils/constants'
import { customFetch } from '../../../services/fetch'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {

  const userData = useSelector(store => store.user)
  

    return (
      userData.id ? 
      <Profile /> 
      : 
      <Navigate to={'/'} />
    )
    }

const Profile = () => {

  const userData = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = () => {
    return {
      firstName: Yup.string().matches(/^$|^[A-Za-z\s]+$/, 'Nombre invalido'),
      lastName: Yup.string().matches(/^$|^[A-Za-z\s]+$/, 'Apellido invalido'),
      email: Yup.string().email('Email invalido'),
      password: Yup.string().min(6, 'Contraseña muy corta'),
      newPassword: Yup.string().min(6, 'Contraseña muy corta')
    }
  }

  const handleSubmit = (formData) => {
    const url = `${BASE_PATH}/users/${userData.id}`
    const properties = {
      method: 'put',
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        image: formData.image,
        password: formData.password,
        newPassword: formData.newPassword,
      }
    }

    customFetch(url, properties)
      .then(data => {
        const token = data.data.token
        localStorage.removeItem('token')
        localStorage.setItem('token', `"${token}"`)
        const updatedUser = {
          id: data.data.user.id,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          email: data.data.user.email,
          roleId: data.data.user.roleId,
          image: data.data.user.image,
         
        }
        dispatch(login(updatedUser))
        navigate('/')
        toast.success('Se modificaron los datos de usuario', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch(error => {
        console.log(error.response.data.errors)
        toast.error( error.response.data.errors , {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
      })
  }

  const formik = useFormik({
    initialValues: {firstName: '', lastName: '', email: '', password: '', newPassword: ''},
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema:  Yup.object(validationSchema()),
    onSubmit: handleSubmit
  })





  return (
    <>
          <div className='profile-container'>
        <h1>Mi perfil</h1>
        <div className='profile-image-container'>
            <img src='/images/default-user.jpg' alt='/images/default-user.jpg' />
        </div>
        <form onSubmit={formik.handleSubmit}>
            <button className='delete-btn'>Cambiar Imagen</button>
            <h3>Nombre:</h3>  
            <input 
              className='edit-profile-input' 
              type='text' 
              name="firstName" 
              id="firstName" 
              onChange={formik.handleChange}
              placeholder={userData.firstName} 
            />
            <h3>Apellido:</h3>  
            <input 
              className='edit-profile-input' 
              type='text' 
              name="lastName" 
              id="lastName" 
              onChange={formik.handleChange}
              placeholder={userData.lastName} 
              />
            <h3>Email:</h3>  
            <input 
              className='edit-profile-input' 
              type='text' 
              name="email" 
              id="email" 
              onChange={formik.handleChange}
              placeholder={userData.email} 
            />
            <h3>Cambiar contraseña:</h3>  
            <h5>Ingrese contraseña actual</h5>
            <input 
              className='edit-profile-input' 
              type='password' 
              name="password" 
              id="password" 
              onChange={formik.handleChange}
              placeholder='*****' 
            />
            <h5>Ingrese contraseña nueva</h5>
            <input 
              className='edit-profile-input' 
              type='password' 
              name="newPassword" 
              id="newPassword" 
              onChange={formik.handleChange}
              placeholder='*****' 
            />
          <div className='profile-btn-cont'>
            <button type='submit' className='edit-btn'>Guardar Perfil</button>
          </div>
        </form>
        </div>
        <ToastContainer />
    </>
  )
}



export default EditProfile