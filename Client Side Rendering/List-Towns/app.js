import { html, render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
const root = document.getElementById('root');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.get('towns');
    const towns = data.split(', ');
    const temp = createTemp(towns);
    render(temp, root);
    e.target.reset();
}

function createTemp(data) {
    return html`
    <ul>
        ${data.map(town => html`<li>${town}</li>`)};
    </ul>`
}