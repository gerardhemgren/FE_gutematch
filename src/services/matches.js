import axios from 'axios';

const baseUrl = 'https://gutematch.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

async function getOpenGames(userId, clientDate) {
    return await axios.post(`${baseUrl}/api/open_matches/${userId}`, clientDate).then(response => response.data)
}

async function getMyGames(userId, clientDate) {
    return await axios.post(`${baseUrl}/api/my_matches/${userId}`, clientDate).then(response => response.data)
}

async function createGame(matchInfo, userId) {
    return await axios.post(`${baseUrl}/api/create_match/${userId}`, matchInfo).then(response => response.data)
}

async function deleteGame(matchId, userId) {
    const match = { id_match: matchId }
    return await axios.delete(`${baseUrl}/api/my_matches/owner/${userId}`, { data: match }).then(response => response.data)
}

async function editGame(matchInfo) {
    return await axios.put(`${baseUrl}/api/my_matches/owner/`, matchInfo).then(response => response.data)
}

async function joinGame(matchId, userId) {
    const match = { id_match: matchId }
    return await axios.post(`${baseUrl}/api/open_matches/owner/${userId}`, match).then(response => response.data)
}

async function leaveGame(matchId, userId) {
    const match = { id_match: matchId }
    return await axios.delete(`${baseUrl}/api/my_matches/${userId}`, { data: match }).then(response => response.data)
}

const exportObj = { getOpenGames, getMyGames, createGame, deleteGame, editGame, joinGame, leaveGame }

export default exportObj