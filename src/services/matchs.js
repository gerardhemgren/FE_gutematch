import axios from 'axios'

const getAllMatchs = () => {
    const request = axios.get('/all_matchs')
    return request
        .then(response => response.data)
}

const getOpenMatchs = (userId) => {
    const request = axios.get(`/open_matchs/${userId}`)
    return request
        .then(response => response.data)
}

const getMyMatchs = (userId) => {
    const request = axios.get(`/my_matchs/${userId}`)
    return request
        .then(response => response.data)
}

const createMatch = (matchInfo, userId) => {
    const request = axios.post(`/add_match/${userId}`, matchInfo)
    return request
        .then(response => response.data)
}

const deleteMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.delete(`/my_matchs/owner/${userId}`, { data: match })
    return request
        .then(response => response.data)
}

const joinMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.post(`/open_matchs/${userId}`, match)
    return request
        .then(response => response.data)
}

const leftMatch = (matchId, userId) => {
    const match = { id_match: matchId }
    const request = axios.delete(`/my_matchs/${userId}`, { data: match })
    return request
        .then(response => response.data)
}

const exportObj = { getAllMatchs, getOpenMatchs, getMyMatchs, createMatch, deleteMatch, joinMatch, leftMatch }

export default exportObj