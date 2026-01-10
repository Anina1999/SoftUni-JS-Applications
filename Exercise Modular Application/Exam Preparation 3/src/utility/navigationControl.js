import { html, render } from './library.js';
import { userUtils } from './userUtils.js';

const root = document.querySelector('nav');
const temp = (hasUser) => html`
    <div>
        <a href="/dashboard">TV Shows</a>
        <a href="/search">Search</a>
    </div>
    ${hasUser ?
        html`
        <div class="user">
            <a href="/create">Add Show</a>
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