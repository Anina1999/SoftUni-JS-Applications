import { html, render } from './library.js';
import { userUtils } from './userUtils.js';

const root = document.querySelector('nav');
const temp = (hasUser) => html`
    <a href="/dashboard">All games</a>
    ${hasUser ?
        html`
        <div id="user">
            <a href="/create">Create Game</a>
            <a href="/logout">Logout</a>
        </div>`
        : html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`
    }
`

export function updateNav() {
    const user = userUtils.getUserId();

    render(temp(!!user), root);
}