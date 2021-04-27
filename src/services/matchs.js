import axios from 'axios'

const getAllMatchs = () => {
    const request = axios.get('http://localhost:5000/all_matchs')
    return request
    .then(response => response.data)
}

const getOpenMatchs = (userId) => {
    const request = axios.get(`http://localhost:5000/open_matchs/${userId}`)
    return request
    .then(response => response.data)
}

const getMyMatchs = (userId) => {
    const request = axios.get(`http://localhost:5000/my_matchs/${userId}`)
    return request
    .then(response => response.data)
}

const createMatch = (matchInfo, userId) => {
    const request = axios.post(`http://localhost:5000/${userId}`, matchInfo)
    return request
    .then(response => response.data)
}

const joinMatch = (matchId, userId) => {
    const match = { id_match: matchId } 
    const request = axios.post(`http://localhost:5000/open_matchs/${userId}`, match)
    return request
    .then(response => response.data)
}

const leftMatch = (matchId, userId) => {
    const match = { id_match: matchId } 
    const request = axios.delete(`http://localhost:5000/my_matchs/${userId}`, {data: match})
    return request
    .then(response => response.data)
}

const exportObj = { getAllMatchs, getOpenMatchs, getMyMatchs, createMatch, joinMatch, leftMatch }

export default exportObj