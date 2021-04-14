import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:5000/allmatchs')
    return request
    .then(response => response.data)
}

const getMyOpenMatchs = (id) => {
    const request = axios.get(`http://localhost:5000/myopengames/${id}`)
    return request
    .then(response => response.data)
}

const exportObj = { getAll, getMyOpenMatchs }

export default exportObj