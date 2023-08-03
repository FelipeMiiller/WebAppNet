import axios from 'axios';








const baseURL = 'http://localhost:7077/api';


const initialState = {
    user: { name: '', email: '' },
    list: []
}


const api = axios.create({
    baseURL,
    
});

export default api;