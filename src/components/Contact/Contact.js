import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { alertConfirmation, alertError } from "../../services/Alert";
import axios from "axios";
import "./Contact.css";
import Loader from "../Loader/Loader"
import { customFetch } from '../../services/fetch'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BASE_PATH } from "../../utils/constants"

//const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const FormCont = () => {

  const [members, setMembers] = useState([])

  const [loader, setLoader] = useState(false)

  const url = `${BASE_PATH}/members`

  const properties = {
    method: 'get'
  }

  useEffect(() => {
    setLoader(true)
    customFetch(url, properties)
      .then(members => {
        if(!members) {
          toast.error( 'La base de datos no se encuentra disponible actualmente' , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return
        }
        setMembers(members.data)
        setLoader(false)
      })
        .catch(error => console.log(error))
  }, [])


  //Formik and yup
  const vDataContac = yup.object().shape({
    name: yup.string().required("Requerido"),
    email: yup.string().email("Formato Email inválido").required("Requerido"),
    phone: yup.number().required("Requerido"),
    message: yup
      .string()
      .min(2)
      .max(250, "250 caracteres permitidos")
      .required("Requerido"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const url = `${BASE_PATH}/contacts`
    const properties = {
      method: 'post',
      data: values
    }
    try {
      await axios(url, properties)
      
      const alertTitle = 'Consulta Enviada'
      const alertMessage = 'Su consulta fue enviada correctamente'
      
      resetForm()
      alertConfirmation(alertTitle, alertMessage)
    } catch (error) {
      alertError('Ups, hubo un error', error)
    }
  }

  return (
    <>
       
      <h1>¡Contáctate con Nosotros!</h1>
      <div className="formCont" >
        <div className="divCenter">
          <div className="row">
          <div className= 'col-sm-6'>
            <h2 className="text">
              Contáctate con nostros por este medio para mas información, para
              ser voluntario o para aportes de colaboración.
            </h2>
          </div>      
          <div className= 'containerForm col-sm-6 pb-4'>
            <Formik
              initialValues={{ name: "", email: "",phone:"", message: "" }}
              validationSchema={vDataContac}
              // onSubmit={async (values) => {
              //   await new Promise((resolve) => setTimeout(resolve, 500));
              //   alert(JSON.stringify(values, null, 2));
              // }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field
                      className="input"
                      name="name"
                      placeholder="Nombre y  Apellido"
                    />
                    {errors.name && touched.name ? (
                      <div className="requerido">{errors.name}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field className="input" name="email" placeholder="Email" />
                    {errors.email && touched.email ? (
                      <div className="requerido">{errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field className="input" name="phone" placeholder="Telefono" />
                    {errors.phone && touched.phone ? (
                      <div className="requerido">{errors.phone}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      className="textarea"
                      rows="10"
                      cols="50"
                      name="message"
                      placeholder="Escriba su consulta"
                    />
                    {errors.message && touched.message ? (
                      <div className="requerido">{errors.message}</div>
                    ) : null}
                  </div>

                  <Field
                    className="btnAzul px-2"
                    type="submit"
                    name="submit"
                    value="Enviar Consulta"
                  />
                </Form>
              )}
            </Formik>
          </div>
          </div>
        </div>
      </div>
          <h2>Miembros Fundadores</h2>
          {loader && <Loader />}
          <div className='members-grid'>
            {members.map(member => member.id < 3 ? <MembersCard key={member.name} id={member.id} image={member.image} name={member.name}/> : null)}
          </div>
          <h2>Otros Miembros</h2>
          {loader && <Loader />}
          <div className= 'other-members-grid'>
            {members.map(member => member.id > 2 ? <MembersCard key={member.name} id={member.id} image={member.image} name={member.name}/> : null)}
          </div>

      <ToastContainer />             
    </>
  );
};


const MembersCard = ({ id, image, name }) => {
  return(
    <div className='members-card'>
    <div className='members-image'>
      <img src={image} alt={name}></img>
    </div>
    <h5 className='members-text'>{name}</h5>
    </div>
  )
}


export default FormCont;
