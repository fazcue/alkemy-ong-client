import React, { useEffect, useState } from "react"
import { customFetch } from '../../../services/fetch'
import recycledStyles from './styles/NewsPanel.module.css'
import s from './styles/TestimonialsPanel.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const UsersPanel = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const url = `${SERVER_BASE_URL}/users`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setUsers(res.data)
        } catch (error) {
            console.log('Error getting users: ', error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className={s.container}>
            <div className={recycledStyles.titleContainer}>
                <h1 className={recycledStyles.title}>Usuarios</h1>
            </div>
            <div className={recycledStyles.newsListContainer}>
                <ul className={recycledStyles.newsList}>
                    {
                        users && users.map((e) => (
                            <div key={e.id} className={recycledStyles.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={recycledStyles.imageContainer}>
                                        <img className={recycledStyles.image} src={`images/${e.image}`} alt="Image" />
                                    </div>
                                    <div className={recycledStyles.dataContainer}>
                                        <h4 className={recycledStyles.newsName}> {e.firstName} {e.lastName} </h4>
                                        <h4 className={recycledStyles.newsName}>{e.email}</h4>
                                    </div>
                                    {/* <div>
                                    <button onClick={() => handleDelete(e.id)} className={s.button}>X</button>
                                </div> */}
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default UsersPanel