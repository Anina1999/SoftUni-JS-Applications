export async function loadInfo() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
    
    if (!response.ok) {
        throw new Error('Problem fetching');
    }
    const data = await response.json();

    return Object.values(data);
}