import React, { useEffect, useState } from "react"
import '../BackOffice.css'
import { customFetch } from "../../../services/fetch"
import { BASE_PATH } from '../../../utils/constants'
import { ToastContainer, toast } from "react-toastify"

const ContactsPanel = () => {
    
    const [contactsMessages, setContactsMessages] = useState([])

    const getContacts = async () => {
        const url = `${BASE_PATH}/contacts`
        const properties = {
            method: 'get'
        }
        try {
            const result = await customFetch(url, properties)
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
            setContactsMessages(messages.data.reverse())
        })
    }, [])

  return (
    <div className="w-100 py-3 align-items-center justify-content-center">
        <h1>Contactos a la pagina</h1>
        {contactsMessages.map(contact => {
            return (
                    <Contact contact={contact} key={contact.id} />
            )
        })}
        <ToastContainer />
    </div>
  )
}

const Contact = ({contact}) => {
    return(
        <div className="contact-container">       
            <p className='contact-name'><strong>Nombre</strong>: <span>{contact.name}</span></p>
            <p className='contact-phone'><strong>Telefono</strong>: <span>{contact.phone}</span></p>
            <p className='contact-email'><strong>Email</strong>: <span>{contact.email}</span></p>
            <p className='contact-message'><strong>Mensaje</strong>: <span>{contact.message}</span></p>
        </div>
    )
}

export default ContactsPanel