import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:5000/allmatchs')
    return request
    .then(response => response.data)
}

const exportObj = { getAll }

export default exportObj