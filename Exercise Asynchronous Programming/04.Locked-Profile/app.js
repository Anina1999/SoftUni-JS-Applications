function lockedProfile() {
    const BASE_URL = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.getElementById('main');
    main.innerHTML = '';

    async function getData() {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        let arr = Object.entries(data);
        let numberOfProfile = 1;

        for (let [_, currentProfile] of arr) {
            const profileCard = createProfileCard(currentProfile, numberOfProfile);
            main.appendChild(profileCard);
            numberOfProfile++;
        }
    }

    function createProfileCard(profile, numberOfProfile) {
        const divProfile = document.createElement('div');
        divProfile.classList.add('profile');

        const img = document.createElement('img');
        img.classList.add('userIcon');
        img.src = './iconProfile2.png';

        const {labelLock, inputLock} = createLabelLock(numberOfProfile);
        const {labelUnlock, inputUnlock, br} = createLabelUnlock(numberOfProfile);

        const hr = document.createElement('hr');

        const {labelUsername, inputUsername} = createLabelUsername(numberOfProfile, profile.username);

        const divHidden = createDivUsername(numberOfProfile, profile.email, profile.age);
        divHidden.style.display = 'none';

        const btn = document.createElement('button');
        btn.textContent = 'Show more';
        btn.addEventListener('click', onClick);
        
        function onClick(e) {
            if (!inputLock.checked) { 
                if (divHidden.style.display === 'none') {
                    divHidden.style.display = 'block';
                    btn.textContent = 'Hide it';
                } else {
                    divHidden.style.display = 'none';
                    btn.textContent = 'Show more';
                }
            }
        };

        divProfile.appendChild(img);
        divProfile.appendChild(labelLock);
        divProfile.appendChild(inputLock);
        divProfile.appendChild(labelUnlock);
        divProfile.appendChild(inputUnlock);
        divProfile.appendChild(br);
        divProfile.appendChild(hr);
        divProfile.appendChild(labelUsername);
        divProfile.appendChild(inputUsername);
        divProfile.appendChild(divHidden);
        divProfile.appendChild(btn);

        return divProfile;
    }

    function createDivUsername(numberOfProfile, email, age) {
        const div = document.createElement('div');
        div.classList.add(`user${numberOfProfile}Username`);

        const hr = document.createElement('hr');
        const {labelEmail, inputEmail} = createLabelEmail(numberOfProfile, email);
        const {labelAge, inputAge} = createLabelAge(numberOfProfile, age);

        div.appendChild(hr);
        div.appendChild(labelEmail);
        div.appendChild(inputEmail);
        div.appendChild(labelAge);
        div.appendChild(inputAge);

        return div;
    }

    function createLabelLock(numberOfProfile) {
        const labelLock = document.createElement('label');
        labelLock.textContent = 'Lock';

        const inputLock = document.createElement('input');
        inputLock.type = 'radio';
        inputLock.name = `user${numberOfProfile}Locked`;
        inputLock.value = 'lock';
        inputLock.checked = true;

        return {labelLock, inputLock};
    }

    function createLabelUnlock(numberOfProfile) {
        const labelUnlock = document.createElement('label');
        labelUnlock.textContent = 'Unlock';

        const inputUnlock = document.createElement('input');
        inputUnlock.type = 'radio';
        inputUnlock.name = `user${numberOfProfile}Locked`;
        inputUnlock.value = 'unlock';

        const br = document.createElement('br');
        return {labelUnlock, inputUnlock, br};
    }

    function createLabelUsername(numberOfProfile, username) {
        const labelUsername = document.createElement('label');
        labelUsername.textContent = 'Username';

        const inputUsername = document.createElement('input');
        inputUsername.type = 'text';
        inputUsername.name = `user${numberOfProfile}Username`;
        inputUsername.value = username;
        inputUsername.disabled = true;
        inputUsername.readOnly = true;

        return {labelUsername, inputUsername};
    }

    function createLabelEmail(numberOfProfile, email) {
        const labelEmail = document.createElement('label');
        labelEmail.textContent = 'Email:';

        const inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.name = `user${numberOfProfile}Email`;
        inputEmail.value = email;
        inputEmail.disabled = true;
        inputEmail.readOnly = true;

        return {labelEmail, inputEmail};
    }

    function createLabelAge(numberOfProfile, age) {
        const labelAge = document.createElement('label');
        labelAge.textContent = 'Age:';

        const inputAge = document.createElement('input');
        inputAge.type = 'number';
        inputAge.name = `user${numberOfProfile}Age`;
        inputAge.value = age;
        inputAge.disabled = true;
        inputAge.readOnly = true;

        return {labelAge, inputAge};
    }

    getData();
}