import { visibleDetails } from './contactTemplate.js';
import { renderContacts } from './renderContacts.js';

export function toggleDetails(id) {
    visibleDetails[id] = !visibleDetails[id];
    renderContacts();
}