import axios from 'axios';

const baseUrl = 'https://gutematch.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

const getOpenMatches = (userId) => {
    const request = axios.get(`${baseUrl}/api/open_matches/${userId}`)
    return request
        .then(response => response.data)
}

const getMyMatches = (userId) => {
    const request = axios.get(`${baseUrl}/api/my_matches/${userId}`)
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
    const request = axios.delete(`${baseUrl}/api/my_matches/owner/${userId}`, { data: match })
    return request
        .then(response => response.data)
}

const joinMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.post(`${baseUrl}/api/open_matches/${userId}`, match)
    return request
        .then(response => response.data)
}

const leaveMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.delete(`${baseUrl}/api/my_matches/${userId}`, { data: match })
    return request
        .then(response => response.data)
}

const exportObj = { getOpenMatches, getMyMatches, createMatch, deleteMatch, joinMatch, leaveMatch }

export default exportObj