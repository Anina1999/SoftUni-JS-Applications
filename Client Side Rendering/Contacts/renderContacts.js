import { render } from 'https://unpkg.com/lit-html?module';
import { allContactsTemplate } from './allContactsTemplate.js';

const container = document.getElementById('contacts');

export function renderContacts() {
    render(allContactsTemplate(), container);
}