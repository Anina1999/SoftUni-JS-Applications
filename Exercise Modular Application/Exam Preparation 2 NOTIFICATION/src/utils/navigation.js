import { html, render } from '../lib.js';
import { getUserData } from "./userUtils.js";

const root = document.querySelector('nav');

const temp = (hasUser) => html`
    <div>
          <a href="/dashboard">Marketplace</a>
        </div>
        ${hasUser ? html`
        <div class="user">
          <a href="/create">Sell</a>
          <a href="/logout">Logout</a>
        </div>
        ` : html`
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
    `}
`

export function updateNav(ctx, next) {
    const userData = getUserData();
    render(temp(!!userData), root);
}