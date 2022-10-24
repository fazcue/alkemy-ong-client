import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import { customFetch } from '../../../services/fetch'
import s from './styles/NewsPanel.module.css'
import { alertError, alertWarning } from '../../../services/Alert'

import NewsForm from '../newsForm/NewsForm'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const NewsPanel = () => {
    const [news, setNews] = useState([])
    const [newsData, setNewsData] = useState({})

    useEffect(() => {
        async function getData() {
            const data = await publicService.newsList()
            setNews(data.data.reverse())
        }
        getData()
    }, [])

    const handleUpdate = async (data) => {
        data.categoryId = 'news';
        setNewsData(data)
        const a = document.getElementById("formDiv");
        if(document.documentElement.scrollWidth < 1000) {
            a.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    const handleCreate = () => {
        const a = document.getElementById("formDiv");
        if(document.documentElement.scrollWidth < 1000) {
            a.scrollIntoView({
                behavior: "smooth"
            })
        }
        setNewsData({})
    }

    const handleDelete = async ({id, name}) => {
        const deleteConfirmation = await alertWarning(name)

        if (deleteConfirmation) {
            try {
                const url = `${SERVER_BASE_URL}/news/${id}`
                const properties = {
                    method: 'delete'
                }
    
                await customFetch(url, properties)
                
                //if deleted, refresh news
                handleRefresh()
                setNewsData({})
            } catch (error) {
                alertError('Error al borrar', 'Por favor, prueba nuevamente')
            }
        }
    }

    const handleRefresh = async () => {
        const data = await publicService.newsList()
        setNews(data.data.reverse())
    }

  return (
    <div className={s.newsPanelContainer}>

        <div className={s.columnLeftContainer}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>Novedades</h1>
            </div>
            <div className={s.buttonsContainer}>
                <button onClick={()=> handleCreate()} className={s.button}>Crear Novedad</button>
                <button onClick={()=> handleRefresh()} className={s.button}>Refresh</button>
            </div>
            <div className={s.newsListContainer}>
                <ul className={s.newsList}>
                    {
                        news.length && news.map((currentNews) => (
                            <div key={currentNews.id} className={s.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={s.imageContainer}>
                                        <img src={currentNews.image} alt={currentNews.name} className={s.image}/>
                                    </div>
                                    
                                    <div className={s.dataContainer}>
                                        <h5 className={s.newsName}> {currentNews.name} </h5>  
                                        <button onClick={() => handleUpdate(currentNews)} className={s.button}>Modificar</button>
                                        <button onClick={() => handleDelete(currentNews)} className={s.button}>Eliminar</button>
                                    </div>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
        
        <div className={s.columRightContainer}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>Crear/Modificar</h1>
            </div>
            <div id='formDiv' className={s.newsFormContainer}>
               {
                newsData.id ? (<NewsForm data={newsData}/>) : ( <NewsForm/>) 
               }
            </div>
        </div>

    </div>
  )
}

export default NewsPanel