import { api } from "./requester.js";

const endpoints = {
    getAllProducts: '/data/products?sortBy=_createdOn%20desc',
    getProductById: (id) => `/data/products/${id}`,
    createProduct: '/data/products',
    // search: '/data/collection',
    addBuys: '/data/bought',
    getTotalBuys: (productId) => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    getUserBuys: (productId, userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    updateProduct: (id) => `/data/products/${id}`,
    deleteProduct: (id) => `/data/products/${id}`
}

async function getAllProducts() {
    return api.get(endpoints.getAllProducts);
}

async function getProductById(id) {
    return api.get(endpoints.getProductById(id));
}

async function createProduct(data) {
    return api.post(endpoints.createProduct, data);
}

async function addBuys(productId) {
    return api.post(endpoints.addBuys, { productId });
}

async function getTotalBuys(productId) {
    return api.get(endpoints.getTotalBuys(productId));
}

async function getUserBuys(productId, userId) {
    return api.get(endpoints.getUserBuys(productId, userId));
}

// async function search(query) {
//     return api.get(endpoints.searchShows(query));
// }

async function updateProduct(id, data) {
    return api.put(endpoints.updateProduct(id), data);
}

async function deleteProduct(id) {
    return api.del(endpoints.deleteProduct(id));
}

export const dataService = {
    getAllProducts,
    getProductById,
    createProduct,
    // search,
    addBuys,
    getTotalBuys,
    getUserBuys,
    updateProduct,
    deleteProduct
};