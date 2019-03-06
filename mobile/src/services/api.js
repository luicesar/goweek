import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.70.252:3000' // IP Maquina Trabalho
    baseURL: 'http://192.168.1.11:3000' // IP Maquina Meu Note

});

export default api;