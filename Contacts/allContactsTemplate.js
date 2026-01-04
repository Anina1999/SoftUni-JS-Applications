import { html } from 'https://unpkg.com/lit-html?module';
import { contacts } from './contacts.js';
import { contactTemplate } from './contactTemplate.js';

export const allContactsTemplate = () => html`
    ${contacts.map(contact => contactTemplate(contact))}
`;