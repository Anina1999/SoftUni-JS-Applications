import { userUtils } from "./userUtils.js";
import { html, render } from './library.js';

const root = document.querySelector('nav');
const temp = (hasUser) => html`
    ${hasUser ? 
        html`
            <a href="/browseTeams" class="action">Browse Teams</a>
            <a href="/myTeams" class="action">My Teams</a>
            <a href="/logout" class="action">Logout</a>
            ` 
        : html`
            <a href="/browseTeams" class="action">Browse Teams</a>
            <a href="/login" class="action">Login</a>
            <a href="/register" class="action">Register</a>
        `
    }
`

export function updateNav() {
    const user = userUtils.getUserId();

    render(temp(!!user), root);
}