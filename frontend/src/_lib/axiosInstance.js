import axios from "axios"

 const axiosInstance  = axios.create({
    baseURL:"https://blogpost-gl3u.onrender.com/api",
    headers:{
        "Content-Type":"application/json"
    }
    ,
    withCredentials:true
})

export default axiosInstance
