import { api } from "./requester.js";

const endpoints = {
    getAllPosts: '/data/cars?sortBy=_createdOn%20desc',
    getPostById: (id) => `/data/cars/${id}`,
    createPost: '/data/cars',
    searchPosts: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`,
    updatePost: (id) => `/data/cars/${id}`,
    deletePost: (id) => `/data/cars/${id}`
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

async function searchPosts(query) {
    return api.get(endpoints.searchPosts(query));
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
    searchPosts,
    updatePost,
    deletePost
};