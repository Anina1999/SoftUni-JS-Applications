//solve 1 using then/catch
function getInfo() {
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/';

    const inputRef = document.getElementById('stopId');
    const busId = inputRef.value;

    const stopRef = document.getElementById('stopName');
    const busListRef = document.getElementById('buses');

    if (!busId) {
        return;
    }

    const response = fetch(BASE_URL + busId);
    response.then(res => {
        res.json().then(data => {
            stopRef.textContent = data.name;
            busListRef.innerHTML = '';
            Object.entries(data.buses).forEach(([busId, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                busListRef.appendChild(li);
            })
        }).catch(err => {
            stopRef.textContent = 'Error';
        }).catch(err => {
            stopRef.textContent = 'Error';
        })
    })
    console.log('finish');
}

//solve 2 using async/await
async function getInfo() {
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/';

    const inputRef = document.getElementById('stopId');
    const busId = inputRef.value;

    const stopRef = document.getElementById('stopName');
    const busListRef = document.getElementById('buses');

    if (!busId) {
        return;
    }

    try {
        const response = await fetch(BASE_URL + busId);
        const data = await response.json();

        busListRef.innerHTML = '';

        stopRef.textContent = data.name;
        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busListRef.appendChild(li);
        })
    } catch (error) {
        stopRef.textContent = 'Error!';
    }
}