import { api } from "../utility/requester.js";

const endpoints = {
    create: 'http://localhost:3030/data/catalog',
    getAll: 'http://localhost:3030/data/catalog',
    getDetails: 'http://localhost:3030/data/catalog/',
    update: 'http://localhost:3030/data/catalog/',
    del: 'http://localhost:3030/data/catalog/',
    getMyFurniture: (userId) => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`
}

async function createFurniture(data) {
    return await api.post(endpoints.create, data);
}

async function getAllFurniture() {
    return await api.get(endpoints.getAll);
}

async function getFurnitureById(id) {
    return await api.get(endpoints.getDetails + id);
}

async function updateFurniture(data, id) {
    return await api.put(endpoints.update + id, data);
}

async function deleteFurniture(id) {
    return await api.del(endpoints.del + id);
}

async function getMyFurniture(userId) {
    return await api.get(endpoints.getMyFurniture(userId));
}

export const dataService = {
    createFurniture,
    getAllFurniture,
    getFurnitureById,
    updateFurniture,
    deleteFurniture,
    getMyFurniture
}