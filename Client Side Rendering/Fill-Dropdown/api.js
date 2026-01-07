const URL = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function get() {
    const response = await fetch(URL);

    if (!response.ok) {
        throw new Error('Problem fetching')
    }

    const data = await response.json();

    return Object.values(data);
}

async function post(data) {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(URL, option);

    if (!response.ok) {
        throw new Error('Problem creating item');
    }
    const result = response.json();
    return result;
}

export const api = {
    get,
    post
}