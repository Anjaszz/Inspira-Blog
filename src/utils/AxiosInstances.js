import axios from "axios";

const AxiosInstances = axios.create({baseURL : "http://localhost:8000/api/v1"})

export default AxiosInstances;