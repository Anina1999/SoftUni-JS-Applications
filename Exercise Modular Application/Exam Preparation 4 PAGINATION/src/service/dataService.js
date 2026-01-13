import { api } from "./requester.js";

const endpoints = {
    getAllEvents: '/data/events?sortBy=_createdOn%20desc',
    getEventById: (id) => `/data/events/${id}`,
    create: '/data/events',
    // search: '/data/collection',
    going: '/data/going',
    totalGoing: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    userGoing: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    update: (id) => `/data/events/${id}`,
    delEvent: (id) => `/data/events/${id}`,
}

async function getAllEvents() {
    return api.get(endpoints.getAllEvents);
}

async function getEventById(id) {
    return api.get(endpoints.getEventById(id));
}

async function createEvent(data) {
    return api.post(endpoints.create, data);
}

async function sendGoing(eventId) {
    return api.post(endpoints.going, {eventId});
}

async function getTotalGoing(eventId) {
    return api.get(endpoints.totalGoing(eventId));
}

async function getUserGoing(eventId, userId) {
    return api.get(endpoints.userGoing(eventId, userId));
}

// async function search(query) {
//     return api.get(endpoints.searchShows(query));
// }

async function updateEvent(id, data) {
    return api.put(endpoints.update(id), data);
}

async function delEvent(id) {
    return api.del(endpoints.delEvent(id));
}

export const dataService = {
    getAllEvents,
    getEventById,
    createEvent,
    sendGoing,
    getTotalGoing,
    getUserGoing,
    updateEvent,
    delEvent
};