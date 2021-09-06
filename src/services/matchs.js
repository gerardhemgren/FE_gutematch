import axios from 'axios';

const baseUrl = 'https://gutematch.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

const getAllMatchs = () => {
    const request = axios.get(`${baseUrl}/api/all_matchs`)
    return request
        .then(response => response.data)
}

const getOpenMatchs = (userId) => {
    const request = axios.get(`${baseUrl}/api/open_matchs/${userId}`)
    return request
        .then(response => response.data)
}

const getMyMatchs = (userId) => {
    const request = axios.get(`${baseUrl}/api/my_matchs/${userId}`)
    return request
        .then(response => response.data)
}

const createMatch = (matchInfo, userId) => {
    const request = axios.post(`${baseUrl}/api/create_match/${userId}`, matchInfo)
    return request
        .then(response => response.data)
}

const deleteMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.delete(`${baseUrl}/api/my_matchs/owner/${userId}`, { data: match })
    return request
        .then(response => response.data)
}

const joinMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.post(`${baseUrl}/api/open_matchs/${userId}`, match)
    return request
        .then(response => response.data)
}

const leaveMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.delete(`${baseUrl}/api/my_matchs/${userId}`, { data: match })
    return request
        .then(response => response.data)
}

const exportObj = { getAllMatchs, getOpenMatchs, getMyMatchs, createMatch, deleteMatch, joinMatch, leaveMatch }

export default exportObj