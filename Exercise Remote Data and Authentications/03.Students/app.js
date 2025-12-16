function createStudents() {
    const URL = 'http://localhost:3030/jsonstore/collections/students';
    const tableBody = document.querySelector('#results tbody');
    const form = document.getElementById('form');
    const notification = document.querySelector('.notification');

    extractStudents();
    form.addEventListener('submit', onSubmit);

    async function extractStudents() {
        tableBody.innerHTML = '';
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Error');
            }

            const data = await response.json();
            const students = Object.values(data);

            students.forEach(s => {
                const tr = document.createElement('tr');

                const firstNameTd = document.createElement('td');
                firstNameTd.textContent = s.firstName;

                const lastNameTd = document.createElement('td');
                lastNameTd.textContent = s.lastName;

                const facultyTd = document.createElement('td');
                facultyTd.textContent = s.facultyNumber;

                const gradeTd = document.createElement('td');
                gradeTd.textContent = s.grade;

                tr.appendChild(firstNameTd);
                tr.appendChild(lastNameTd);
                tr.appendChild(facultyTd);
                tr.appendChild(gradeTd);
                tableBody.appendChild(tr);
            });
        } catch (err) {
            notification.textContent = err.message;
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        notification.textContent = '';

        const formData = new FormData(form);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const facultyNumber = formData.get('facultyNumber').trim();
        const grade = formData.get('grade').trim();

        if (!firstName || !lastName || !facultyNumber || !grade) {
            notification.textContent = 'Fields must not be empty';
            return;
        }

          if (isNaN(facultyNumber) || isNaN(grade)) {
            notification.textContent = 'Faculty Number and Grade must be numbers';
            return;
        }

        const option = { 
            firstName, 
            lastName, 
            facultyNumber, 
            grade 
        };

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(option)
            });

            if (!response.ok) {
                throw new Error('Error');
            }

            form.reset(); 
            extractStudents();
        } catch (err) {
            notification.textContent = err.message;
        }
    }
}

createStudents();