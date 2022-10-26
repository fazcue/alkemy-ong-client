import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/Main/Main/Main'
import Contact from './components/Contact/Contact'
import Login from './components/Users/Login/Login'
import Register from './components/Users/Register/Register';
import ActivityHome from './components/Activities/ActivityHome/ActivityHome'
import BackOffice from './components/BackOffice/BackOffice';
import { Routes, Route } from 'react-router-dom';
import ActivityDetail from './components/Activities/ActivityDetail/ActivityDetail';
import NewsHome from './components/News/NewsHome/NewsHome'
import NewsDetail from './components/News/NewsDetail/NewsDetail'
import Layout from './components/Layout/Layout';
import AboutUs from './components/AboutUs/AboutUs' 
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from './reducers/userReducer'
import { BASE_PATH } from './utils/constants'
import { customFetch } from './services/fetch'
import ProtectedRoute from './features/protectedRoute/ProtectedRoute'
import TestimonialsHome from './components/Testimonials/TestimonialsHome/TestimonialsHome';
import EditProfile from './components/Profile/EditProfile/EditProfile';
import Profile from './components/Profile/Profile'

function App() {
  // const location = useLocation();
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const refreshURL = `${BASE_PATH}/auth/me`
  const refreshProperties = {
    method: 'get'
  }
  useEffect(() => {
    if(token){
      customFetch(refreshURL, refreshProperties)
        .then(user => {
          let userObj = {
            id: user.data.payload.id,
            firstName: user.data.payload.firstName,
            lastName: user.data.payload.lastName,
            email: user.data.payload.email,
            image: user.data.payload.image,
            roleId: user.data.payload.roleId,
            token
          }
          dispatch(refresh(userObj))
        })
          .catch(error => console.log(error))
      }
  }, [])


  const userData = useSelector(store => store.user)

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<MainSPA userData={userData} />} />
        {/* <Route path="/contact" element={<ScreenContact />} /> */}
        <Route element={<ProtectedRoute isAllowed={!!userData && userData.roleId === 1} />}>
          <Route path="/backOffice/*" element={ <BackOffice/> } />
          {/* <Route path="/backoffice/users" element={<UsersTable />} /> */}
          {/* <Route path="/backoffice/activities" element={<Activities />} />     */}
          {/* <Route exact path='/backoffice/contacts' element={<ContactsPanel />} /> */}
          {/* <Route path='/backoffice/newspanel' element={<NewsPanel/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}

function MainSPA({ userData }) {


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/usuario/:id' element={<Profile />} />
        <Route path='/usuario/editar/:id' element={<EditProfile/>} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/usuario/:id" element={<Profile />} />
        <Route path="/usuario/editar/:id" element={<EditProfile />} />
        <Route path="/nosotros" element={<AboutUs/>} />
        <Route path="/novedades" element={<NewsHome />} />
        <Route path="/novedades/:id" element={<NewsDetail />} />
        <Route path='/actividades' element={<ActivityHome />} />
        <Route path='/actividades/:id' element={<ActivityDetail />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testimonios" element={<TestimonialsHome />} />
      </Routes>
    </Layout>
  );
}


export default App;