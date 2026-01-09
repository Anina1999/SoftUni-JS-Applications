import { api } from "./requester.js";

const endpoints = {
    getAllTeams: 'http://localhost:3030/data/teams',
    getAllMembers: 'http://localhost:3030/data/members?where=status%3D%22member%22',
    getTeamById: 'http://localhost:3030/data/teams/',
    getMembersForTeam: (teamId) => `http://localhost:3030/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`
}

async function getAllTeams() {
    return await api.get(endpoints.getAllTeams);
}

async function getAllMembers() {
    return await api.get(endpoints.getAllMembers);
}

async function getTeamById(id) {
    return await api.get(endpoints.getTeamById + id);
}

async function getTeamMembers(teamId) {
    return await api.get(endpoints.getMembersForTeam(teamId));
}

export const dataService = {
    getAllTeams,
    getAllMembers,
    getTeamById,
    getTeamMembers
}