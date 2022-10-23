import axios from 'axios'

let adminAxios = axios.create({
    baseURL: 'http://localhost:3001'
})

const adminService = {
        categoriesPanel: async () => {
        return await adminAxios.get(`/categories`)
    }
}

export default adminService;