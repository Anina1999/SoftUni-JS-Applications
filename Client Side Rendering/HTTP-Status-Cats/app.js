import { cats } from './catSeeder.js'
import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('allCats');

render(createTemp(), root);

function createTemp() {
    const cartTemp = cats.map(cat => createCartTemp(cat));
    return html`
    <ul>
        ${cartTemp}
    </ul>`
}

function createCartTemp(cat) {
    return html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${onToggleButton}>Show status code</button>
                    <div class="status" style="display: none" id="100">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>`
}

function onToggleButton(e) {
    const target = e.target;
    const div = target.nextElementSibling;

    if (div.style.display === 'none') {
        div.style.display = 'block';
        target.textContent = 'Hide status code';
    } else {
        div.style.display = 'none';
        target.textContent = 'Show status code';
    }   
}