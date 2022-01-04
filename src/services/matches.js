import axios from 'axios';

const baseUrl = 'https://gutematch.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

async function getOpenMatches(userId) {
    return await axios.get(`${baseUrl}/api/open_matches/${userId}`).then(response => response.data)
}

async function getMyMatches(userId) {
    return await axios.get(`${baseUrl}/api/my_matches/${userId}`).then(response => response.data)  
}

async function createMatch(matchInfo, userId){
    return await axios.post(`${baseUrl}/api/create_match/${userId}`, matchInfo) .then(response => response.data)       
}

async function deleteMatch(matchId, userId) {
    const match = { id_match: matchId }
    return await axios.delete(`${baseUrl}/api/my_matches/owner/${userId}`, { data: match }).then(response => response.data)
}

async function joinMatch(matchId, userId) {
    const match = { id_match: matchId }
    return await axios.post(`${baseUrl}/api/open_matches/${userId}`, match).then(response => response.data)        
}

async function leaveMatch(matchId, userId) {
    const match = { id_match: matchId }
    return await axios.delete(`${baseUrl}/api/my_matches/${userId}`, { data: match }).then(response => response.data)   
}

const exportObj = { getOpenMatches, getMyMatches, createMatch, deleteMatch, joinMatch, leaveMatch }

export default exportObj