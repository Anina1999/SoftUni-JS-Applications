function solution() {
    const main = document.getElementById('main');
    main.innerHTML = '';

    loadArticles();

    async function loadArticles() {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');

            if (!response.ok) {
                throw new Error('Error fetching article list');
            }

            const data = await response.json();

            for (const article of data) {
                const accordion = createArticleElement(article);
                main.appendChild(accordion);
            }

        } catch (err) {
            console.error('Error:', err);
        }
    }

    function createArticleElement(article) {
        const accordion = document.createElement('div');
        accordion.className = 'accordion';

        const head = document.createElement('div');
        head.className = 'head';

        const span = document.createElement('span');
        span.textContent = article.title;

        const button = document.createElement('button');
        button.className = 'button';
        button.id = article._id;
        button.textContent = 'More';
        button.addEventListener('click', toggle);

        head.appendChild(span);
        head.appendChild(button);

        const extra = document.createElement('div');
        extra.className = 'extra';
        extra.style.display = 'none';

        const p = document.createElement('p');
        extra.appendChild(p);

        accordion.appendChild(head);
        accordion.appendChild(extra);

        return accordion;
    }

    async function toggle(event) {
        const button = event.target;
        const accordion = button.parentElement.parentElement;
        const extra = accordion.querySelector('.extra');

        if (button.textContent === 'More') {
            const id = button.id;
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Error fetching details');
                }

                const data = await res.json();
                extra.querySelector('p').textContent = data.content;

                extra.style.display = 'block';
                button.textContent = 'Less';
            } catch (err) {
                console.error(err);
            }

        } else {
            extra.style.display = 'none';
            button.textContent = 'More';
        }
    }
}

solution();