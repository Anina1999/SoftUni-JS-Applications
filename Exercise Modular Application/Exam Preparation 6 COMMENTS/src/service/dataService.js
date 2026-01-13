import { api } from "./requester.js";

const endpoints = {
    getAllGames: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    getGameById: (id) => `/data/games/${id}`,
    createGame: '/data/games',
    // search: '/data/collection',
    getComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    createNewComment: '/data/comments',
    updateGame: (id) => `/data/games/${id}`,
    deleteGame: (id) => `/data/games/${id}`,
}

async function getAllGames() {
    return api.get(endpoints.getAllGames);
}

async function getGameById(id) {
    return api.get(endpoints.getGameById(id));
}

async function getComments(id) {
    return api.get(endpoints.getComments(id));
}

async function createGame(data) {
    return api.post(endpoints.createGame, data);
}

async function createNewComment(data) {
    return api.post(endpoints.createNewComment, data);
}

// async function search(query) {
//     return api.get(endpoints.searchShows(query));
// }

async function updateGame(id, data) {
    return api.put(endpoints.updateGame(id), data);
}

async function deleteGame(id) {
    return api.del(endpoints.deleteGame(id));
}

export const dataService = {
    getAllGames,
    getGameById,
    createGame,
    getComments,
    createNewComment,
    // search,
    updateGame,
    deleteGame
};