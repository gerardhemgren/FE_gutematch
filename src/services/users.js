import axios from 'axios'

const logIn_signUp = (userId) => {
    const request = axios.post(`http://localhost:5000/config/${userId}`)
    return request
        .then(response => response.data)
}

const exportObj = { logIn_signUp }

export default exportObj