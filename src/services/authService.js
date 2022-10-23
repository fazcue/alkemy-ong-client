import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/users/auth'

const authService = {
    checkEmail: async (data) => {
        return await axios.post('/checkEmail', data)
    },
    checkPassword: async (data) => {
        return await axios.post("/checkPassword", data)
    },
    register: async (data) => {
        return await axios.post("/register", data)
    },
    login: async (data) => {
        return await axios.post("/login", data)
    }
}


export default authService;