function displayBooks() {
    const URL = 'http://localhost:3030/jsonstore/collections/books';
    const loadBtn = document.getElementById('loadBooks');
    const form = document.querySelector('form');
    const tbody = document.querySelector('tbody');
    const formTitle = form.querySelector('h3');
    const submitBtn = form.querySelector('button');

    loadBtn.addEventListener('click', onLoad);
    form.addEventListener('submit', onSubmit);

    async function onLoad() {
        const res = await fetch(URL);
        const data = await res.json();

        tbody.innerHTML = '';

        Object.entries(data).forEach(([id, book]) => {
            const tr = document.createElement('tr');
            tr.dataset.id = id;

            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;

            tr.querySelector('.edit').addEventListener('click', onEdit);
            tr.querySelector('.delete').addEventListener('click', onDelete);

            tbody.appendChild(tr);
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title').trim();
        const author = formData.get('author').trim();

        if (!title || !author) {
            alert('All fields are required!');
            return;
        }

        const book = { author, title };

        if (form.dataset.id) {
            const id = form.dataset.id;

            await fetch(`${URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            });

            resetForm();
        } else {
            await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            });
        }

        await onLoad();
    }

    function onEdit(e) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        const title = tr.children[0].textContent;
        const author = tr.children[1].textContent;

        form.querySelector('input[name="title"]').value = title;
        form.querySelector('input[name="author"]').value = author;
        formTitle.textContent = 'Edit FORM';
        submitBtn.textContent = 'Save';
        form.dataset.id = id;
    }

    async function onDelete(e) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        await fetch(`${URL}/${id}`, { method: 'DELETE' });
        onLoad();
    }

    function resetForm() {
        form.reset();
        formTitle.textContent = 'FORM';
        submitBtn.textContent = 'Submit';
        delete form.dataset.id;
    }
}

displayBooks();