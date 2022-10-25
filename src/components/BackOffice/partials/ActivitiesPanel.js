import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import { customFetch } from '../../../services/fetch'
import s from './styles/ActivitiesPanel.module.css'
import { alertError, alertWarning } from '../../../services/Alert'

import ActivitiesForm from '../../BackOffice/activityForm/ActivityForm'
import Loader from '../../Loader/Loader'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const ActivitiesPanel = () => {
    const [activities, setActivities] = useState([])
    const [activityData, setActivityData] = useState({})

    useEffect(() => {
        async function getData() {
            const data = await publicService.activitiesList()
            setActivities(data.data.reverse())
        }
        getData()
    }, [])

    const handleUpdate = async (data) => {
        data.categoryId = 'activities';
        setActivityData(data)
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
        setActivityData({})
    }

    const handleDelete = async ({id, name}) => {
        const deleteConfirmation = await alertWarning(name)

        if (deleteConfirmation) {
            try {
                const url = `${SERVER_BASE_URL}/activities/${id}`
                const properties = {
                    method: 'delete'
                }
    
                await customFetch(url, properties)
                
                //if deleted, refresh news
                handleRefresh()
                setActivityData({})
            } catch (error) {
                alertError('Error al borrar', 'Por favor, prueba nuevamente')
            }
        }
    }

    const handleRefresh = async () => {
        const data = await publicService.activitiesList()
        setActivities(data.data.reverse())
    }

  return (
    <div className={s.activitiesPanelContainer}>

        <div className={s.columnLeftContainer}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>Actividades</h1>
            </div>
            <div className={s.buttonsContainer}>
                <button onClick={()=> handleCreate()} className={s.button}>Crear Actividad</button>
                <button onClick={()=> handleRefresh()} className={s.button}>Refresh</button>
            </div>
            <div className={s.activitiesListContainer}>
                <ul className={s.activitiesList}>
                    {
                        !activities.length ? 
                        <Loader/>
                        : activities.map(activity => (
                            <div key={activity.id} className={s.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={s.imageContainer}>
                                        <img src={activity.image} alt={activity.name} className={s.image}/>
                                    </div>
                                    <div className={s.dataContainer}>
                                        <h5 className={s.activitiesName}> {activity.name} </h5>  
                                        <button onClick={() => handleUpdate(activity)} className={s.button}>Modificar</button>
                                        <button onClick={() => handleDelete(activity)} className={s.button}>Eliminar</button>
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
            <div id='formDiv' className={s.activitiesFormContainer}>
               {
                activityData.id ? (<ActivitiesForm data={activityData}/>) : ( <ActivitiesForm/>) 
               }
            </div>
        </div>

    </div>
  )
}

export default ActivitiesPanel
