import { api } from "../utility/requester.js";
import { userUtils } from "../utility/userUtils.js";

const endpoints = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout'
}

async function login(data) {
    const userData = await api.post(endpoints.login, data);
    userUtils.storeUserData(userData);
}

async function register(data) {
    const userData = await api.post(endpoints.register, data);
    userUtils.storeUserData(userData);
}

async function logout() {
    await api.get(endpoints.logout);
    userUtils.clearUserData();
}

export const userService = {
    login,
    register,
    logout
}