import axios from 'axios';
import { config } from './environment'

const baseUrl = config.url.API_URL;

const logIn_signUp = async (userInfo) => {
    const request = axios.post(`${baseUrl}/api/config`, userInfo);
    const response = await request;
    return response.data;
}

const exportObj = { logIn_signUp };

export default exportObj;