import axios from 'axios';

export default axios.create({
    baseURL: 'https://us-central1-ecomm-fed59.cloudfunctions.net/app'
});