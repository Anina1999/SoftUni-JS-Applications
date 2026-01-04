function storeUserData(userData) {
    if (!userData) {
        return;
    }

    const email = userData.email;
    const id = userData._id;
    const accessToken = userData.accessToken;

    sessionStorage.setItem('userData', JSON.stringify({ email, id, accessToken}))
}

function hasUser() {
    return !!sessionStorage.getItem('userData');
}

function getUserId() {
    return JSON.parse(sessionStorage.getItem('userData'))?.id;
}

function getAccessToken() {
    return JSON.parse(sessionStorage.getItem('userData'))?.accessToken;
}

function hasOwner(ownerId) {
    return getUserId() === ownerId;
}

function clear() {
    return sessionStorage.removeItem('userData');
}

export const userUtils = {
    storeUserData,
    hasOwner,
    hasUser,
    getUserId,
    getAccessToken,
    clear
}