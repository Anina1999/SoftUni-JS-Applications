function attachEvents() {
    const BASE_URL = ' http://localhost:3030/jsonstore/messenger';
    const textAreaRef = document.getElementById('messages');
    const authorRef = document.querySelector('input[name="author"]');
    const contentRef = document.querySelector('input[name="content"]');

    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onLoad);

    onLoad();

    async function onSubmit(e) {
        const author = authorRef.value;
        const content = contentRef.value;

        if (!author || !content) {
            return;
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author, content})
        }

        await fetch(BASE_URL, option);
        authorRef.value = '';
        contentRef.value = '';

        onLoad();
    }

    async function onLoad(e) {
        const response = await fetch(BASE_URL);
        if (response.status !== 200) {
            return;
        }
        const data = await response.json();

        let buff = '';

        Object.values(data).forEach((rec) => {
            buff += `${rec.author}: ${rec.content}\n`;
        })

        textAreaRef.value = buff.trim()    ;
    }
}

attachEvents();