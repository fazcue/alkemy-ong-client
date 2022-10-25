import React, { useEffect, useState } from "react"
import { customFetch } from '../../../services/fetch'
import recycledStyles from './styles/NewsPanel.module.css'
import s from './styles/TestimonialsPanel.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const TestimonialsPanel = ()=> {
    const [ testimonials, setTestimonials ] = useState(null)
    
    const getTestimonials = async () => {
        try {
            const url = `${SERVER_BASE_URL}/testimonials`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setTestimonials(res.data)
        } catch (error) {
            console.log('Error getting news: ', error)
        }
    }

    useEffect(() => {
        getTestimonials()
    },[])

    const handleDelete = async (id) => {
        const url = `${SERVER_BASE_URL}/testimonials/delete/${id}`
        const properties = {
            method: 'delete'
        }
        await customFetch(url, properties)
        getTestimonials()
    }
    return (
        <div className={s.container}>
            <div className={recycledStyles.titleContainer}>
                <h1 className={recycledStyles.title}>Testimonios</h1>
            </div>
            <div className={recycledStyles.newsListContainer}>
                <ul className={recycledStyles.newsList}>
                    {
                        testimonials && testimonials.map((e) => (
                            <div key={e.id} className={recycledStyles.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={recycledStyles.imageContainer}>
                                        <img className={recycledStyles.image} src={`images/${e.image}`} alt="Image" />
                                    </div>
                                    <div className={recycledStyles.dataContainer}>
                                        <h5 className={recycledStyles.newsName}> {e.name} </h5>
                                        <p>{e.content}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDelete(e.id)} className={s.button}>X</button>
                                    </div>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default TestimonialsPanel