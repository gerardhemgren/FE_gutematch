import axios from 'axios';

const baseUrl = 'https://gutematch.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

const logIn_signUp = async (userInfo) => {
    const request = axios.post(`${baseUrl}/api/config`, userInfo);
    const response = await request;
    return response.data;
}

const exportObj = { logIn_signUp };

export default exportObj;