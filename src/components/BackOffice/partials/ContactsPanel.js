import React, { useEffect, useState } from "react"
import '../BackOffice.css'
import { customFetch } from "../../../services/fetch"
import { BASE_PATH } from '../../../utils/constants'
import { ToastContainer, toast } from "react-toastify"

const ContactsPanel = () => {
    
    const [contactsMessages, setContactsMessages] = useState([])

    const getContacts =  () => {
        const url = `${BASE_PATH}/contacts`
        const properties = {
            method: 'get'
        }
        try {
            const result = customFetch(url, properties)
            return result
        } catch (error) {
            toast.error( error.msg , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    useEffect(() => {
       getContacts()
        .then(messages => {
            setContactsMessages(messages.data)
        })
    }, [])

  return (
    <>
    <h1>Contactos a la pagina</h1>
    {contactsMessages.map(contact => {
        return (
            <>
            <Contact contact={contact} key={contact.email}/>
            <ToastContainer />
            </>
        )
    })}
    </>
  )
}

const Contact = ({contact}) => {
    
    return(
        <>
        <div className="contact-container">       
            <h6 className='contact-name'>Nombre: <span>{contact.name}</span></h6>
            <h6 className='contact-phone'>Telefono: <span>{contact.phone}</span></h6>
            <h6 className='contact-email'>Email: <span>{contact.email}</span></h6>
            <h6 className='contact-message'>Mensaje: <span>{contact.message}</span></h6>
        </div>
        </>
    )
}

export default ContactsPanel