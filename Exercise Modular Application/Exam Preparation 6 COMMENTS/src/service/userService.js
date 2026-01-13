import { userUtils } from "../utility/userUtils.js";
import { api } from "./requester.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
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