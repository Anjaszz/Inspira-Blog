import axios from "axios";

const AxiosInstances = axios.create({baseURL : "http://localhost:8000/api/v1"})

AxiosInstances.interceptors.request.use((req) =>{
    const StringfyBlogData = window.localStorage.getItem("BlogData");

    if(StringfyBlogData){
        const DataBlog = JSON.parse(StringfyBlogData)
        const token = DataBlog.token;

        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})

export default AxiosInstances;