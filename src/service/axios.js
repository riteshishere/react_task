import axios from 'axios'
import isAuthenticUser from '../utilities/isAuthenticUser'

const baseURL = 'https://us-central1-ecomm-fed59.cloudfunctions.net/app'
const token = isAuthenticUser()

const axiosInstance = axios.create({
    baseURL: baseURL
})
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `bearer ${token}`
}

export default axiosInstance