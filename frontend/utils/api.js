import axios from "axios"

const api = axios.create({
 baseURL: "https://task-engine.onrender.com/api",
 withCredentials: true
})

export default api