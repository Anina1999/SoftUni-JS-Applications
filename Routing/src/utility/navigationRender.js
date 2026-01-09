import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { userUtils } from './userUtils.js';

const root = document.querySelector('nav');
const temp = (userData) => html`
    <a id="catalogLink" href="/" >Dashboard</a>
        ${userData ? userTemp() : guestTemp()}
`

const userTemp = () => html`
    <div id="user">
        <a id="createLink" href="/create">Create Furniture</a>
        <a id="profileLink" href="/my-furniture" >My Publications</a>
        <a id="logoutBtn" href="/logout">Logout</a>
    </div>
    `

const guestTemp = () => html`
    <div id="guest">
        <a id="loginLink" href="/login">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>
    `

export function updateNav() {
    const userData = userUtils.getUserId();

    // if (!userData) {
    //     return alert('Must be logged in');
    // }

    render(temp(userData), root);
}