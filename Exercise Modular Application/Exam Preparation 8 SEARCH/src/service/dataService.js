import { api } from "./requester.js";

const endpoints = {
    getAllPosts: '/data/fruits?sortBy=_createdOn%20desc',
    getPostById: (id) => `/data/fruits/${id}`,
    createPost: '/data/fruits',
    searchPost: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
    updatePost: (id) => `/data/fruits/${id}`,
    deletePost: (id) => `/data/fruits/${id}`,
}

async function getAllPosts() {
    return api.get(endpoints.getAllPosts);
}

async function getPostById(id) {
    return api.get(endpoints.getPostById(id));
}

async function createPost(data) {
    return api.post(endpoints.createPost, data);
}

async function searchPost(query) {
    return api.get(endpoints.searchPost(query));
}

async function updatePost(id, data) {
    return api.put(endpoints.updatePost(id), data);
}

async function deletePost(id) {
    return api.del(endpoints.deletePost(id));
}

export const dataService = {
    getAllPosts,
    getPostById,
    createPost,
    // search,
    updatePost,
    searchPost,
    deletePost
};