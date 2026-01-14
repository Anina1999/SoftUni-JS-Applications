import { html, render } from './library.js';
import { userUtils } from './userUtils.js';

const root = document.querySelector('nav');
const temp = (hasUser) => html`
    <div>
        <a href="/dashboard">Products</a>
    </div>
    ${hasUser ?
        html`
        <div class="user">
            <a href="/create">Add Product</a>
            <a href="/logout">Logout</a>
        </div>`
        : html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`
    }
`

export function updateNav() {
    const user = userUtils.getUserId();

    render(temp(!!user), root);
}