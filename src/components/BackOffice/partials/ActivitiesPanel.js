import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import { customFetch } from '../../../services/fetch'
import s from './styles/ActivitiesPanel.module.css'
import { alertError, alertWarning } from '../../../services/Alert'

import ActivitiesForm from '../../BackOffice/activityForm/ActivityForm'
import Loader from '../../Loader/Loader'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const ActivitiesPanel = () => {
    const [activities, setActivities] = useState(null)
    const [activityData, setActivityData] = useState({})

    const [ activitiesSearch, setActivitiesSearch ] = useState([])
    const [ search, setSearch ] = useState('')

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
                
                //if deleted, refresh activities
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

    const searchActivities = (e) => {
        setSearch(e.target.value)
        setActivitiesSearch(activities.filter(activity => activity.name.toLowerCase().includes(e.target.value)))
    }

    const Item = ({ currentActivity }) => {
        return (
            <div className={s.listItemContainer}>
                <li className={s.listItem}>
                    <div className={s.imageContainer}>
                        <img src={currentActivity.image} alt={currentActivity.name} className={s.image}/>
                    </div>
                    
                    <div className={s.dataContainer}>
                        <h5>{currentActivity.name}</h5>  
                        <button onClick={() => handleUpdate(currentActivity)} className={s.button}>Modificar</button>
                        <button onClick={() => handleDelete(currentActivity)} className={s.button}>Eliminar</button>
                    </div>
                </li>
            </div>
        )
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
                <input onChange={searchActivities} className={s.search} placeholder='Buscar actividad...' />
            </div>
            <div className={s.activitiesListContainer}>
            <ul className={s.activitiesList}>
                    {!activities ?
                        <Loader />
                    :
                        search ? 
                            activitiesSearch.length > 0 ?
                                activitiesSearch.map((currentActivity) => <Item key={currentActivity.id} currentActivity={currentActivity} />)
                            :
                                <p className='text-center'>No se encontraron novedades</p>
                            
                        :
                            activities.length > 0 ? 
                                activities.map((currentActivity) => <Item key={currentActivity.id} currentActivity={currentActivity} />)
                            :
                                <p className='text-center'>No se encontraron novedades</p>
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
