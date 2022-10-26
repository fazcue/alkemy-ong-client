import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import styles from './Contact.module.css'
import parse from 'html-react-parser'

//Social Icons
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const Contact = () => {
	const [socialLinks, setSocialLinks] = useState([])

	const text = [
		'<p>En <strong>SOMOS MÁS</strong> necesitamos el apoyo de todos.</p>',
		'<p>Si deseas <em>ser voluntario</em>, <em>realizar aportes</em>, o recibir mayor información sobre <strong>nuestro trabajo</strong>, puedes contactarnos mediante el siguiente formulario.<p>',
		'<p>O bien puedes hacerlo a través de</p>'
	]

	const thanksMessage = '<p>Desde ya, muchas gracias por ayudarnos ❤️</p>'

	useEffect(() => {
        fetch(`${SERVER_BASE_URL}/organizations/1/public`)
            .then(response => response.json())
            .then(data => setSocialLinks(data.socialLinks))
    }, [])

	//Social media icon
    //Add more if needed (first import it from 'react-bootstrap-icons')
    const SocialIcon = ({ socialName, size }) => {
        switch (socialName) {
            case 'Facebook':
                return <Facebook size={size} className={styles.icon} />
            case 'Instagram':
                return <Instagram size={size} className={styles.icon} />
            case 'Twitter':
                return <Twitter size={size} className={styles.icon} />
            default:
                return null
        }
    }

    const SocialLinks = () => {
        return (
            <div>
                <h3>Nuestras redes</h3>
                {socialLinks.length > 0 && (
                    <ul>
                        {socialLinks.map((social, index) => {
                            return (
                                <li key={`social-${index}`}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                                        <SocialIcon socialName={social.name} size={36} />
                                        {' '}{social.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }

	return (
		<div className={styles.container}>
			<h1>Contáctate con Nosotros</h1>
			<div className={styles.row}>
				<div className={styles.column}>
					{text.map(text => parse(text))}
					<SocialLinks />
					{parse(thanksMessage)}
				</div>
				<h3 className={styles.formText}>Formulario de contacto</h3>
				<ContactForm />
			</div>
		</div>
	)
}

export default Contact
