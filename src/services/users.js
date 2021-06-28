import axios from 'axios'

const logIn_signUp = (userId, fname) => {
    const name = { name: fname }
    const request = axios.post(`/config/${userId}`, name)
    return request
        .then(response => response.data)
}

const exportObj = { logIn_signUp }

export default exportObj