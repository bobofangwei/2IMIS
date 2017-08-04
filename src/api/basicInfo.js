import config from './config.js';
import axios from 'axios';

export function getProductInfo() {
    return axios.get('/api/products', config);
};
