import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9000'

export default {
    get: axios.get,
};
