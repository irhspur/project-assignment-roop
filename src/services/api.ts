import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://raw.githubusercontent.com/openfootball/football.json/master'

export default {
    get: axios.get,
};
