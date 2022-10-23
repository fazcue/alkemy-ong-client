import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

//Social Icons
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'

//styles
import styles from './Footer.module.css'

//dummy data (replace it with data receive from public endpoint when available)
const links = [
    {
        name: 'Actividades',
        url: '/actividades'
    },
    {
        name: 'Novedades',
        url: '/novedades'
    },
    {
        name: 'Nosotros',
        url: '/nosotros'
    }
]

/* const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://instagram.com'
    },
    {
        name: 'Facebook',
        url: 'https://facebook.com'
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com'
    }
] */

const Footer = () => {

    const [socialLinks, setSocialLinks] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/organizations/1/public')
            .then(response => response.json())
            .then(data => setSocialLinks(data.socialLinks))
    }, []);

    console.log(socialLinks)

    const Logo = () => {
        return (
            <div className={`${styles.box} ${styles.logoContainer}`}>
                <img src='/images/logo.png' alt='logo SOMOS MAS' className={styles.logo} />
            </div>
        )
    }

    const WebLinks = () => {
        return (
            <div className={`${styles.box} ${styles.webLinks}`}>
                <h3>Nuestras secciones</h3>
                {links.length > 0 && (
                    <ul>
                        {links.map((link, index) => {
                            return (
                                <li key={`web-${index}`}>
                                    <Link to={link.url}>{link.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }

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
            <div className={`${styles.box} ${styles.socialLinks}`}>
                <h3>Nuestras redes</h3>
                {socialLinks.length > 0 && (
                    <ul>
                        {socialLinks.map((social, index) => {
                            return (
                                <li key={`social-${index}`}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                        <SocialIcon socialName={social.name} size={18} />
                                        {social.name}
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
        <>
            <div className={styles.container}>
                <Logo />
                <SocialLinks />
                <WebLinks />
            </div>
            <div className={styles.contact}>
                <Link to='/contacto'>Contáctanos</Link>
            </div>
        </>
    )
}

export default Footer
