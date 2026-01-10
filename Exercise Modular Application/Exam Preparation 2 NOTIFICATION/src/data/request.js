import { clearUserData, getUserData } from "../utils/userUtils.js";
import { showNotification } from "../utils/notification.js";

const hostName = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(hostName + url, options);

        if (!response.ok) {
            const error = await response.json();
            console.error(error.message);

            if (error.message === 'Invalid access token') {
                clearUserData();
            }

            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        showNotification(error);
        throw error;
    }
}

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const del = (url) => request('DELETE', url);