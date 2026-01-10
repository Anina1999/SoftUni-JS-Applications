import { api } from "./requester.js";

const endpoints = {
    getAllShows: 'http://localhost:3030/data/shows?sortBy=_createdOn%20desc',
    getShowById: (id) => `http://localhost:3030/data/shows/${id}`,
    createShow: `http://localhost:3030/data/shows`,
    searchShows: (query) => `http://localhost:3030/data/shows?where=title%20LIKE%20%22${query}%22`,
    editShow: (id) => `http://localhost:3030/data/shows/${id}`,
    deleteShow: (id) => `http://localhost:3030/data/shows/${id}`,
}

async function getAllShows() {
    return api.get(endpoints.getAllShows);
}

async function getShowById(id) {
    return api.get(endpoints.getShowById(id));
}

async function createShow(data) {
    return api.post(endpoints.createShow, data);
}

async function searchShows(query) {
    return api.get(endpoints.searchShows(query));
}

async function editShow(id, data) {
    return api.put(endpoints.editShow(id), data);
}

async function deleteShow(id) {
    return api.del(endpoints.deleteShow(id));
}

export const dataService = {
    getAllShows,
    getShowById,
    createShow,
    searchShows,
    editShow,
    deleteShow
};
