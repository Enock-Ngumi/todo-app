import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:7257/api"
});

export default API;