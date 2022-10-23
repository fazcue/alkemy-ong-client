import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import s from './styles/NewsPanel.module.css'

import NewsForm from '../newsForm/NewsForm'

const NewsPanel = () => {
    const [news, setNews] = useState([])
    const [newData, setNewData] = useState({})

    useEffect(() => {
        async function getData() {
            const data = await publicService.newsList()
            setNews(data.data.reverse())
        }
        getData()
    }, [])

    const handleUpdate = async (data) => {
        data.categoryId = 'news';
        setNewData(data)
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
        setNewData({})
    }

    const handleRefresh = async () => {
        const data = await publicService.newsList()
        setNews(data.data.reverse())
    }

  return (
    <div className={s.newsPanelContainer}>

        <div className={s.columnLeftContainer}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>Noticias</h1>
            </div>
            <div className={s.buttonsContainer}>
                <button onClick={()=> handleCreate()} className={s.button}>Crear Noticia</button>
                <button onClick={()=> handleRefresh()} className={s.button}>Refresh</button>
            </div>
            <div className={s.newsListContainer}>
                <ul className={s.newsList}>
                    {
                        news.length && news.map((e) => (
                            <div key={e.id} className={s.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={s.imageContainer}>
                                        <img src={e.image} alt="Image" className={s.image}/>
                                    </div>
                                    <div className={s.dataContainer}>
                                        <h5 className={s.newsName}> {e.name} </h5>  
                                        <button onClick={() => handleUpdate(e)} className={s.button}>Modificar</button>
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
                newData.id ? (<NewsForm data={newData}/>) : ( <NewsForm/>) 
               }
            </div>
        </div>

    </div>
  )
}

export default NewsPanel