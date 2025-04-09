import axios from 'axios';

// Définir l'adresse de base de l'API
const apiClient = axios.create({
    baseURL: 'http://10.126.4.177:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
