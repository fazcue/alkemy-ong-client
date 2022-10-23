import React, { useEffect, useState } from 'react'
import publicService from '../../../services/publicService'
import s from './styles/ActivitiesPanel.module.css'

import ActivitiesForm from '../../BackOffice/activityForm/ActivityForm'

const ActivitiesPanel = () => {
    const [activities, setActivities] = useState([])
    const [newData, setNewData] = useState({})

    useEffect(() => {
        async function getData() {
            const data = await publicService.activitiesList()
            setActivities(data.data.reverse())
        }
        getData()
    }, [])

    const handleUpdate = async (data) => {
        data.categoryId = 'activities';
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
                        activities.length && activities.map((e) => (
                            <div key={e.id} className={s.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={s.imageContainer}>
                                        <img src={e.image} alt="Image" className={s.image}/>
                                    </div>
                                    <div className={s.dataContainer}>
                                        <h5 className={s.activitiesName}> {e.name} </h5>  
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
            <div id='formDiv' className={s.activitiesFormContainer}>
               {
                newData.id ? (<ActivitiesForm data={newData}/>) : ( <ActivitiesForm/>) 
               }
            </div>
        </div>

    </div>
  )
}

export default ActivitiesPanel
