import axios from 'axios'

const getAllMatchs = () => {
    const request = axios.get('http://localhost:5000/all_matchs')
    return request
    .then(response => response.data)
}

const getOpenMatchs = (id) => {
    const request = axios.get(`http://localhost:5000/open_matchs/${id}`)
    return request
    .then(response => response.data)
}

const getMyMatchs = (id) => {
    const request = axios.get(`http://localhost:5000/my_matchs/${id}`)
    return request
    .then(response => response.data)
}

const postMatch = (matchId, userId) => {
    const match = { id_match: matchId } 
    const request = axios.post(`http://localhost:5000/open_matchs/${userId}`, match)
    return request
    .then(response => response.data)
}

const exportObj = { getAllMatchs, getOpenMatchs, getMyMatchs, postMatch }

export default exportObj