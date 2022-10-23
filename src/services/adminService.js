import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

let adminAxios = axios.create({
    baseURL: SERVER_BASE_URL
})

const adminService = {
        categoriesPanel: async () => {
        return await adminAxios.get(`/categories`)
    }
}

export default adminService;