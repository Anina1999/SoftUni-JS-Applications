import { userUtils } from "../utility/userUtils.js";
import { api } from "./requester.js"

const endpoints = {
    login: 'http://localhost:3030/users/login',
    register: 'http://localhost:3030/users/register',
    logout: 'http://localhost:3030/users/logout'
}

async function login(data) {
    const userData = await api.post(endpoints.login, data);
    return userUtils.storeUserData(userData);
}

async function register(data) {
    const userData = await api.post(endpoints.register, data);
    return userUtils.storeUserData(userData);
}

async function logout() {
    await api.get(endpoints.logout);
    return userUtils.clearUserData();
}

export const userService = {
    login,
    register,
    logout
}