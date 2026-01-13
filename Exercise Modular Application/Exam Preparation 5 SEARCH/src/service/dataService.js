import { api } from "./requester.js";

const endpoints = {
    getAll: '/data/motorcycles?sortBy=_createdOn%20desc',
    getById: (id) => `/data/motorcycles/${id}`,
    create: '/data/motorcycles',
    searchRecord: (query) =>`/data/motorcycles?where=model%20LIKE%20%22${query}%22`,
    updateRecord: (id) => `/data/motorcycles/${id}`,
    delRecord: (id) => `/data/motorcycles/${id}`,
}

async function getAllRecords() {
    return api.get(endpoints.getAll);
}

async function getRecordById(id) {
    return api.get(endpoints.getById(id));
}

async function createRecord(data) {
    return api.post(endpoints.create, data);
}

async function searchRecord(query) {
    return api.get(endpoints.searchRecord(query));
}

async function updateRecord(id, data) {
    return api.put(endpoints.updateRecord(id), data);
}

async function delRecord(id) {
    return api.del(endpoints.delRecord(id));
}

export const dataService = {
    getAllRecords,
    getRecordById,
    createRecord,
    searchRecord,
    updateRecord,
    delRecord
};