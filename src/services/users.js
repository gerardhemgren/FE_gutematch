import axios from 'axios'

// const baseUrl = 'https://gutematch.herokuapp.com';
const baseUrl = 'http://localhost:5000';

const logIn_signUp = (userInfo) => {
    const request = axios.post(`${baseUrl}/api/config`, userInfo)
    return request
        .then(response => response.data)
}

const exportObj = { logIn_signUp }

export default exportObj