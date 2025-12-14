function solve() {

    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
    const infoBoxRef = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    const stopInfo = {
        name: "",
        nextStop: "depot"
    }

    async function depart() {
        fetch(BASE_URL + stopInfo.nextStop)
            .then(response => {
                response.json().then(data => {
                    stopInfo.name = data.name;
                    stopInfo.nextStop = data.next;
                    infoBoxRef.textContent = `Next stop ${stopInfo.name}`;
                    departBtn.disabled = true;
                    arriveBtn.disabled = false;
                }).catch(err => {
                    infoBoxRef.textContent = 'Error';
                    departBtn.disabled = true;
                    arriveBtn.disabled = true;
                })
            }).catch(err => {
                infoBoxRef.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })
        // try {
        //     const response = await fetch(BASE_URL + stopInfo.nextStop);
        //     const data = await response.json();

        //     stopInfo.name = data.name;
        //     stopInfo.nextStop = data.next;

        //     infoBoxRef.textContent = `Next stop ${stopInfo.name}`;

        //     departBtn.disabled = true;
        //     arriveBtn.disabled = false;
        // } catch (error) {
        //     infoBoxRef.textContent = 'Error';

        //     departBtn.disabled = true;
        //     arriveBtn.disabled = true;
        // }
    }

    function arrive() {
        infoBoxRef.textContent = `Arriving at ${stopInfo.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();