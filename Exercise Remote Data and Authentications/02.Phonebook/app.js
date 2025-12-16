function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/phonebook';

    const phoneBookUl = document.getElementById('phonebook');
    const personRef = document.getElementById('person');
    const phoneRef = document.getElementById('phone');

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    async function onLoad (e) {
        
        const response = await fetch(BASE_URL);
        if (response.status !== 200) {
            return;
        }
        
        const data = await response.json();
        phoneBookUl.innerHTML = '';
        Object.values(data).forEach((rec) => createRecord(rec));
    }

    async function onCreate(e) {
        const person = personRef.value;
        const phone = phoneRef.value;

        if (!person || !phone) {
            return;
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({person, phone})
        };

        personRef.value = '';
        phoneRef.value = '';

        await fetch(BASE_URL, option);
        onLoad();
    }

    function createRecord(data) {
        const li = document.createElement('li');
        li.textContent = `${data.person}: ${data.phone}`;
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.addEventListener('click', onDelete);
        li.appendChild(btn);
        li.dataset.id = data._id;

        phoneBookUl.appendChild(li);
    }

    async function onDelete(e) {
        const id = e.target.parentElement.dataset.id;

        await fetch(BASE_URL + '/' + id, {method: 'DELETE'});
        onLoad();
    }
}

attachEvents();